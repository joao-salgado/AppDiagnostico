export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NOVO'
    }
  },
  {
    name: 'Diagnósticos',
    url: '/diagnosticos',
    icon: 'icon-paper-clip',
    children: [
      {
        name: 'DGC',
        url: '/diagnosticos/bw',
        icon: 'icon-badge',
        badge: {
          variant: 'success',
          text: 'DISPONÍVEL'
        }
      },
      {
        name: 'DGC-C',
        url: '/diagnosticos/dgcc',
        icon: 'icon-hourglass',
        badge: {
          variant: 'secondary',
          text: 'EM BREVE'
        }
      },
      {
        name: 'KMD',
        url: '/diagnosticos/kmd',
        icon: 'icon-hourglass',
        badge: {
          variant: 'secondary',
          text: 'EM BREVE'
        }
      },
      {
        name: 'APO',
        url: '/diagnosticos/apo',
        icon: 'icon-hourglass',
        badge: {
          variant: 'secondary',
          text: 'EM BREVE'
        }
      },
      {
        name: 'OKA',
        url: '/diagnosticos/oka',
        icon: 'icon-hourglass',
        badge: {
          variant: 'secondary',
          text: 'EM BREVE'
        }
      },
      {
        name: 'SDKM',
        url: '/diagnosticos/sdkm',
        icon: 'icon-hourglass',
        badge: {
          variant: 'secondary',
          text: 'EM BREVE'
        }
      }
    ]
  },
  {
    title: true,
    name: 'Usuários'
  },
  {
    name: 'Usuários',
    url: '/usuarios',
    icon: 'fa fa-user-o'
  },
  {
    name: 'Convites',
    url: '/convites',
    icon: 'icon-user-follow'
  }
];
