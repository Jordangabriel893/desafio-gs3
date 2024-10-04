import { http, HttpResponse } from 'msw'
import { User } from '../app/models/user.model';
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUIDs

let users: User[] = [
  {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
    password: '12345678',
    email: 'admin@admin.com.br',
    permission: {
      id: 1,
      role: 'Administrador',
      canViewAllProfiles: true,
      canEditUserProfiles: true,
      canCreateProfiles: true,
      canEditProfiles: true,
    },
  },
  {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b4d',
    password: '43215678',
    email: 'paulo@user.com.br',
    permission: {
      id: 2,
      role: 'Usuário',
      canViewAllProfiles: false,
      canEditUserProfiles: true,
      canCreateProfiles: false,
      canEditProfiles: false,
    },
  },
  {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b5d',
    password: '67891234',
    email: 'jordan@teste.com.br',
    permission: {
      id: 2,
      role: 'Usuário',
      canViewAllProfiles: false,
      canEditUserProfiles: true,
      canCreateProfiles: false,
      canEditProfiles: false,
    },
  },
];
let permissions = [
  {
    id: 1,
    role: 'Administrador',
    canViewAllProfiles: true,
    canEditUserProfiles: true,
    canCreateProfiles: true,
    canEditProfiles: true,
  },
  {
    id: 2,
    role: 'Usuário',
    canViewAllProfiles: false,
    canEditUserProfiles: true,
    canCreateProfiles: false,
    canEditProfiles: false,
  },

];

export const handlers = [
  // Auth
  http.post('https://gs3.com/auth', async ({ request }) => {
    const auth: any = await request.json();


    const user = users.find(
      (u: any) => u.email === auth.email && u.password === auth.password
    );

    if (user) {
      const userWithoutPassword = {
        id: user?.id,
        email:user?.email,
        permission: user?.permission,
      }
      return HttpResponse.json({
        message: 'Login realizado com sucesso',
        user: userWithoutPassword,
      });
    } else {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Email ou senha incorretos',
      })
    }

  }),

  // Profiles
  http.get('https://gs3.com/profiles', () => {
    return HttpResponse.json([...permissions]);
  }),

  http.put('https://gs3.com/profiles/:id', async ({ request, params }) => {
    const { id } = params

    const updatedPermission = await request.json();

    const permissionIndex = permissions.findIndex((permission: any) => permission.id == id);

    if (permissionIndex === -1) {
      return new HttpResponse(null, { status: 500 })
    }

    Object.assign(permissions[permissionIndex], updatedPermission);
    return HttpResponse.json({
      message: 'Perfil atualizado com sucesso',

    });
  }),

  // User
  http.post('https://gs3.com/user/list', async ({ request }) => {
    let responseUsers;
    const user: any = await request.json();
    if(!user.permission.canViewAllProfiles){
      responseUsers = users.filter(usr=> usr.id == user.id)
    }else{
      responseUsers = users;
    }
    return HttpResponse.json(responseUsers)
  }),


  http.post('https://gs3.com/user', async ({ request }) => {
    const user: any = await request.json();

    const emailExists = users.some(existingUser => existingUser.email === user.email);

    if (emailExists) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Email já cadastrado!',
      })
    }

    const newUser: any = {
      id: uuidv4(),
      email:user.email,
      password: '12345678',
      permission: user.profile,
    };

    users.push(newUser);

    return HttpResponse.json({
      message: 'Usuário criado com sucesso',
      user: newUser,
    });
  }),

  http.put('https://gs3.com/user/:id', async ({ request, params }) => {
    const { id } = params;
    const nextUser: any = await request.json();

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Não foi possivel realizar a atualização dos dados!',
      })
    }
    const user: any = {
      id: nextUser?.id,
      email:nextUser?.email,
      password: users[userIndex].password,
      permission: nextUser?.profile,
    }

    Object.assign(users[userIndex], user);

    // delete user.password
    return HttpResponse.json({
      message: 'Usuário atualizado com sucesso',
      user: user,
    });
  }),
];


