import React from 'react'

function ExternalFoodCard(props) {
    const { name, p, c, f, fib, img, addFood } = props
    return(
        <section className="external-food-card">
            <h3>{name}</h3>
            <img src={img} alt={title} />
            <p>Protein: {p}</p>
            <p>Carbs: {c}</p>
            <p>Fat: {f}</p>
            <p>Fiber: {fib}</p>
            <button onClick={() => addFood(name, p, c, f, fib, img)}>Add {name}</button>
        </section>
    )
}
export default ExternalFoodCard