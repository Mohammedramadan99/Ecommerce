// Please enter your username or email address. You will receive a link to create a new password via email. Remember now? Back to login
import {LocalShippingOutlined,RocketLaunch,Headphones,LockOpenOutlined,CardGiftcard,FacebookOutlined,Twitter,Instagram,Pinterest} from '@mui/icons-material'
import cat_1 from './Imgs/coat_1.png'
import cat_2 from './Imgs/shirts_8.png'
import cat_3 from './Imgs/shose_4.png'
import cat_4 from './Imgs/mask_1.png'
import product_1 from './Imgs/shirts_4.png'
import product_2 from './Imgs/shirts_2.png'
import product_3 from './Imgs/shirts_1.png'
import product_4 from './Imgs/coat_6.png'
import product_5 from './Imgs/coat_2.png'
import product_6 from './Imgs/shose_4.png'
import product_7 from './Imgs/shose_3.png'
import payment from './Imgs/payment.png'

const data = {
    services:[
        {
            title:"Free Shipping",
            desc:"free shipping and returns every single order",
            icon: <LocalShippingOutlined/>
        },
        {
            title:"Support 24/7",
            desc:"customer services whole 24 hour & live chat",
            icon: <Headphones/>
        },
        {
            title:"gifts",
            desc:"earning gifts and enjoy lots of benefits",
            icon: <CardGiftcard/>
        },
        {
            title:"Payment Secure",
            desc:"secure payment visa, mastercart and paypal",
            icon: <LockOpenOutlined/>
        },
    ],
    categories:[
        {
            title:"coats",
            desc:"coats with many colors",
            img:cat_1,
        },
        {
            title:"shirts",
            desc:"shirts for men,children with colors",
            img:cat_2,
        },
        {
            title:"shipping",
            desc:"fast and free",
            icon: <RocketLaunch/> ,
        },
        {
            title:"shose",
            desc:"summer clouth",
            img:cat_3,
        },
        {
            title:"masks",
            img:cat_4,
        },
    ],
    products:[
        {
            id:0,
            title:"white shirt",
            desc:"white shirt with long arm",
            price:30,
            rating:4.5,
            imgs: [{id:0,img:product_1},{id:1,img:product_1},{id:2,img:product_1}],
            img:product_1,
            sizes:['xx','xxx','xl','m','s'],
            category:"shirts",
            activeClass:false
        },
        {
            id:2,
            title:"orange shirt",
            desc:"orange shirt for summer",
            price:20,
            rating:4.2,
            imgs: [{id:0,img:product_2},{id:1,img:product_2},{id:2,img:product_2}],
            img:product_2,
            sizes:['xx','xxx','xl','m','s'],
            category:"shirts",
            activeClass:false
        },
        {
            id:3,
            title:"black shirt",
            desc:"black shirt for summer",
            price:20,
            rating:4.2,
            imgs: [{id:0,img:product_3},{id:1,img:product_3},{id:2,img:product_3}],
            img:product_3,
            sizes:['xx','xxx','xl','m','s'],
            category:"shirts",
            activeClass:false

        },
        {
            id:4,
            title:"heavy coat",
            desc:"has many colors",
            price:100,
            rating:3.8,
            imgs: [{id:0,img:product_4},{id:1,img:product_4},{id:2,img:product_4}],
            img:product_4,
            sizes:['xx','xxx','xl','m','s'],
            category:"coats",
            activeClass:false

        },
        {
            id:5,
            title:"long coat",
            desc:"fantastic coat for winter",
            price:200,
            rating:3.8,
            imgs: [{id:0,img:product_5},{id:1,img:product_5},{id:2,img:product_5}],
            img:product_5,
            sizes:['xx','xxx','xl','m','s'],
            category:"coats",
            activeClass:false
        },
        {
            id:6,
            title:"shose",
            desc:"browen classic shose",
            price:120,
            rating:4.9,
            imgs: [{id:0,img:product_6},{id:1,img:product_6},{id:2,img:product_6}],
            img:product_6,
            sizes:['xx','xxx','xl','m','s'],
            category:"shoses",
            activeClass:false
        },
        {
            id:7,
            title:"black shose",
            desc:"black classic shose",
            price:110,
            rating:4.9,
            imgs: [{id:0,img:product_7},{id:1,img:product_7},{id:2,img:product_7}],
            img:product_7,
            sizes:['xx','xxx','xl','m','s'],
            category:"shoses",
            activeClass:false
        },
    ],
    footerItems:{

        groupOne:[
            {
                title:'shop',
                items: [
                    'new','women','men','shoes','bags'
                ]
            },
            {
                title:'information',
                items: [
                    'about','customer service','privacy policy','blog'
                ]
            }, 
            {
                title:'customer service',
                items: [
                    'orders','contact us','FAQ'
                ]
            },
        ],
        groupTwo:[
            {
                title:'keep in touch',
                items: [
                    <FacebookOutlined/>,<Twitter/>,<Instagram/>,<Pinterest/>
                ],
            },
        ],
        groupThree:[
            {
                title:'payment accept',
                img: payment,
            }
        ]
    }

    
}
export default data