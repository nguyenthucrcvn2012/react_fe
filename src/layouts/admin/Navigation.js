import React, {useState} from "react";
import { Link } from "react-router-dom";


const Navigation = (data) => {

    // const [pagination, setPagination] = useState({
    //     current_page: '',
    //     last_page: '',
    //     next_page_url: '',
    //     per_page: '',
    //     next_page_url: '',
    //     prev_page_url: '',
    //     to: '',
    //     total: '',
    //     from: ''
    // });

    // setPagination({
    //     ...pagination,
    //     from: data.Paginate.users.last_page
    // })}

    // console.log(2);
    // console.log(data.Paginate);
    // console.log(2);
    // console.log(data.Paginate.users)
    // console.log(data.Paginate.users.from)
    // console.log(data.Paginate.users.last_page)

    return (

        <div className="paginate-style">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><Link className="page-link" to="#">&lt;</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">&gt;</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;