import Products from '../pages/Shop'
import About from './About'
import FAQ from './FAQ'

export const navLinks = [
    {
        title:"About",
        component:<About/>,
        path:"#about"
    },

    {
        title:"Shop",
        component:<Products/>,
        path:"/products"
    },

    {
        title:"FAQ",
       component:<FAQ/>,
       path:"#faq"
    },
]