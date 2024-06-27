// Rating component ... 

function Rating({ value, text }) {
  return (
    <>
      <div className="rating" style={{ color: 'yellow' }}>
        <span>
          <i className={value >= 1 ? "fa-solid fa-star" : value >= 0.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"}></i>
        </span>
        <span>
          <i className={value >= 2 ? "fa-solid fa-star" : value >= 1.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"}></i>
        </span>
        <span>
          <i className={value >= 3 ? "fa-solid fa-star" : value >= 2.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"}></i>
        </span>
        <span>
          <i className={value >= 4 ? "fa-solid fa-star" : value >= 3.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"}></i>
        </span>
        <span>
          <i className={value >= 5 ? "fa-solid fa-star" : value >= 4.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"}></i>
        </span>
        <span style={{ color: "brown" }}>{text}</span>
      </div>
    </>
  )
}

export default Rating;
