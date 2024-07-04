import React, { useEffect, useState } from 'react';
//import { Col, Row } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
// import './scroll.scss';
import './LatestNewsScroll.css';

import axios from 'axios';
//import newIcon from '../../assets/img/blinking_new.gif';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import { Link } from "react-router-dom";
//import { ArrowRight } from "react-feather";
import { FaNewspaper } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
// import ImageWithBasePath from "../../core/img/imagewithbasebath";



function LatestNews() {
    const currentUser = getCurrentUser('current_user');
    //const [newsRes, setNewRes] = useState({});
    const [news, setNews] = useState([]);
    // const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const togglePause = () => {
        setIsPaused(!isPaused);
    };
    useEffect(() => {
        const fetchNews = async () => {
            let teacherParam = encryptGlobal(
                JSON.stringify({
                    category: 'mentor'
                })
            );
            var config = {
                method: 'get',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    `/latest_news/list?Data=${teacherParam}`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${currentUser.data[0]?.token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setNews(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchNews();
    }, []);

    return(
        <div className="card flex-fill default-cover mb-4 latest-news-container">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Latest News <FaNewspaper style={{ color: 'red',marginLeft:"6px"}} /> </h4>
                <div className="view-all-link">
                    <Link to="#" className="view-all d-flex align-items-center">
                        Program Updates
                        <span className="ps-2 d-flex align-items-center">
                            <i className="fa fa-bell" style={{ color: 'blue'}}></i>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive dataview">
                    <table className="table dashboard-recent-products">
                        <thead></thead>
                        <tbody className={`scrolling-container ${isPaused ? 'paused' : ''} continuous-scroll-list  table-responsive dataview`} onMouseEnter={togglePause} onMouseLeave={togglePause}>
                            {news?.map((item, index) => (
                                <tr key={index}>
                                    <td className="productimgname">
                                        {item?.new_status != 0 && item?.new_status !='' ? (
                                            <FaStar size={20} style={{ marginRight: '10px', color: 'red', transition: 'transform 0.3s ease-in-out' }} />
                                        ) : (
                                            ''
                                        )}
                                    
                                        {item?.details} 
                                
                                        {item?.file_name != null && item?.file_name !='' ? (
                                            <a
                                                className="link-item m-2 p-2"
                                                href={
                                                    item?.file_name
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <button className="btn btn-warning p-2 ">
                                                    File
                                                </button>
                                            </a>
                                        ) : (
                                            ''
                                        )}
                                    
                                        {item?.url != null && item?.url != '' ? (
                                            <a
                                                className="link-item"
                                                rel="noopener noreferrer"
                                                href={item?.url}
                                                target="_blank"
                                            >
                                                <button className="btn btn-success  ">
                                                        Url
                                                </button>
                                            </a>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        </div>
    );
}
export default LatestNews;