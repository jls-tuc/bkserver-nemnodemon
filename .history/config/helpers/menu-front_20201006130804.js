const getMenuFront = (role = 'USER_ROLE' ) => {
           const menu =  [
          {
            title: "Principal",
            root: true,
            icon: "flaticon2-architecture-and-city",
            svg: "./assets/media/svg/icons/Design/Layers.svg",
            page: "/dashboard",
            bullet: "dot",
          },
          
          { section: "Registro de LLamadas" },
          {
            title: "Registros",
            root: true,
            bullet: "dot",
            page: "/registros",
            icon: "flaticon2-browser-2",
            svg: "./assets/media/svg/icons/Communication/Active-call.svg",
          },
          
          {
            title: "Estadisticas",
            root: true,
            bullet: "dot",
            page: "/estadisticas",
            submenu: [
             // { title: " Indicadores", bullet: "dot", page: " /indicadores " },
             // { title: "Exportar", bullet: "dot", page: " /exportar " },
            ],
            icon: "flaticon2-browser-2",
            svg: "./assets/media/svg/icons/Communication/Active-call.svg",
          },
          // { section: "Administacion" },
          {
            title: "ABM",
            root: true,
            bullet: "dot",
            icon: "flaticon2-browser-2",
            submenu: [
                //{ title: " Usuarios", bullet: "dot", page: " /usuarios " }
            ],
            svg: "./assets/media/svg/icons/Communication/Active-call.svg",
          },
        ],

      if( role ==='ADMIN_ROLE'){
          menu[3].submenu.unshift({ title: " Indicadores", bullet: "dot", page: " /indicadores " },{ title: "Exportar", bullet: "dot", page: " /exportar " },)

      } else if (role ==='SISTEM_ROLE'){
        menu[3].submenu.unshift({ title: " Indicadores", bullet: "dot", page: " /indicadores " },{ title: "Exportar", bullet: "dot", page: " /exportar " },),
        menu[4]. submenu.unshift({title: " Usuarios", bullet: "dot", page: " /usuarios "})

      }

        return menu;
      };

      module.exports = { getMenuFront}
