import React from 'react'
import { Link } from 'react-router-dom'

function MenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, total_fib, img } = props
    return(
        <section className="menu-card">
            <h3>{title}</h3>
            <img src={img} alt={title} />
            <p>Total Protein: {total_p}</p>
            <p>Total Carbs: {total_c}</p>
            <p>Total Fat: {total_f}</p>
            <p>Total Fiber: {total_fib}</p>
            <Link to={`/menu/${menu_id}`}><button>View {title} Details</button></Link>
        </section>
    )
}
export default MenuCard