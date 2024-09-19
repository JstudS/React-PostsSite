import React from "react";
import MyButton from "../button/MyButton";
import { usePagination } from "../../../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => {
    const pagesArray = usePagination(totalPages)

    return (
        <div className="pages__btns">
        {pagesArray.map(el => {
        return <div 
          className={page === el ? 'page__btn' : 'page'} 
          key={el}
          onClick={() => changePage(el)}
        >
          <MyButton>{el}</MyButton>
        </div> 
        })}
      </div>
    )
}

export default Pagination