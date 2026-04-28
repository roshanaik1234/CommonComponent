// import React, { useState } from 'react'
// import "./CreateSideBar.css"

// const CreateCommonSideBar = () => {
//        const [activeTab, setActiveTab] = useState("/home")
//     const tabSideBar = [
//         { menu: "Home", link: "/home" },
//         { menu: "About", link: "/about" },
//         { menu: "Services", link: "/services" },
//         { menu: "Contact", link: "/contact" },
//     ]

//     return (
//         <div className='sidebarComponent'>
//             {
//                 tabSideBar.map((m) => (
//                     <div 
//                     key={m.link}
//                      href={m.link}
//                      className={activeTab === m.link ? "active" : ""}
//                       onClick={(e) => {
//                             e.preventDefault()
//                             setActiveTab(m.link)
//                         }} >
//                         {m.menu}
//                     </div>    
//                 ))
//             }
//         </div>
//     )
// }

// export default CreateCommonSideBar

import React, { useState } from 'react'
import "./CreateSideBar.css"

const CreateCommonSideBar = () => {
    const [activeTab, setActiveTab] = useState("/home")
    const [isCollapsed, setIsCollapsed] = useState(false)

    const tabSideBar = [
        { menu: "Home", link: "/home", icon: "🏠" },
        { menu: "About", link: "/about", icon: "👤" },
        { menu: "Services", link: "/services", icon: "⚙️" },
        { menu: "Contact", link: "/contact", icon: "📞" },
    ]

    return (
        <div className={`sidebarComponent ${isCollapsed ? "collapsed" : ""}`}>
            
            <button className="toggleBtn" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? "→" : "←"}
            </button>

            {tabSideBar.map((m) => (
                <div
                    key={m.link}
                    className={`sidebarItem ${activeTab === m.link ? "active" : ""}`}
                    onClick={() => setActiveTab(m.link)}
                >
                    <span className="icon">{m.icon}</span>
                    {!isCollapsed && <span className="label">{m.menu}</span>}
                </div>
            ))}
        </div>
    )
}

export default CreateCommonSideBar