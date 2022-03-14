import React from "react";

//functional component reactjs
const Navigation = (props) => {
    //props is state data from parent component
    let pageState = props.Paginate;

    //Bắt sự kiện click chuyển trang, trả về parrent component số trang
    const handleNav = (pageNumber) => {
        props.childToParent(pageNumber)
    }

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= pageState.last_page; i++) {
        if(i > pageState.current_page - 3 && i  < pageState.current_page + 3 || pageState.current_page === i){
            pageNumbers.push(i);
        }
    }

    //Render nút nhảy trang
    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li className="page-item " key={number}  id={number}>
                <button className="page-link "  onClick={() => handleNav(number)} > {number}</button>
            </li>
        );
    });

    // render nút về trang đầu trang cuối
    var renderPrev = "";
    var renderNext = "";
    if(pageState.last_page > 3){
        if(pageState.current_page !== 1){
            renderPrev =   (
                <li className="page-item"><button className="page-link" onClick={() => handleNav(1)} >Đầu</button></li>
            )
        }
        if(pageState.current_page !== pageState.last_page){
            renderNext  = (
                <li className="page-item"><button className="page-link" onClick={() => handleNav(pageState.last_page)} >Cuối</button></li>
            )
        }
    }

    return (

        <div className="paginate-style">
            <nav aria-label="Page navigation example">
                <span>Showing {pageState.from } to {pageState.to } of {pageState.total} entries</span>

                <ul className="pagination">
                    {renderPrev}
                    {renderPageNumbers}
                    {renderNext}
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;


// export default class Navigation extends Component {

//     handleClick() {
//         console.log(this.props)
//     }

//     render() {
//         return (
//             <div>
//                 {this.props.parentToChild}
//                 <button onClick={() => this.handleClick()}>Click</button>
//             </div>
//         )
//     }
// }