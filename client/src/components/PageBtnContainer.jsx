import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import CSSWrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';


export default function PageBtnContainer() {
    const { data: { numOfPages, currentPage } } = useAllJobsContext();
    const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
    
    const navigate = useNavigate();
    const { search, pathname } = useLocation();
    console.log(search, pathname)

    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    // console.log(pages)
    return (
        <CSSWrapper>
            <button
                className='btn prev-btn'
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = numOfPages;
                    handlePageChange(prevPage)
                }}
            >
                <HiChevronDoubleLeft />
                prev
            </button>

            <div className='btn-container'>
                {pages.map((pageNumber) => (
                    <button
                        className={`page-btn btn ${pageNumber === currentPage && 'active'}`}
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))

                }
            </div>

            <button
                className='btn next-btn'
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPages) nextPage = 1;
                    handlePageChange(nextPage)
                }}
            >
                next
                <HiChevronDoubleRight />
            </button>
        </CSSWrapper>
    )
}