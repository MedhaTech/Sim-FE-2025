/* eslint-disable indent */
import React from 'react';


const RatedDetailCard = (props) => {
   
    console.warn(props);
    const [overAll, setOverAll] = React.useState('');
    const [novelity, setNovelity] = React.useState(0);
    const [usefulness, setUsefulness] = React.useState(0);
    const [feasability, setFeasability] = React.useState(0);
    const [scalability, setScalability] = React.useState(0);
    const [sustainability, setSustainability] = React.useState(0);
    React.useEffect(() => {
        if (props?.details?.evaluator_ratings?.length > 0) {
            const ratings = props.details.evaluator_ratings;
    
            const average = (key) =>
                ratings.reduce((sum, item) => sum + Number(item[key] || 0), 0) /
                ratings.length;
    
            setOverAll(average("overall"));
            setNovelity(average("param_1"));
            setUsefulness(average("param_2"));
            setFeasability(average("param_3"));
            setScalability(average("param_4"));
            setSustainability(average("param_5"));
        }
    }, [props]);
    
   
    return (
        <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
            <div className="row">
                <div className="col-12">
                    <p className="text-center fw-bold m-0 mb-3" style={{fontSize:"1.2rem"}}>
                        {' '}
                        <span className="text-info">L2</span>- Rating
                        Details
                    </p>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p
                        className="fw-bold text-center"
                        style={{ marginBottom: '5px' ,fontSize:"1.2rem"}}
                    >
                        {overAll}
                    </p>
                </div>
                <div className="col-12 mb-2">
                    <p className="text-muted text-center">OverAll Rating</p>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-4">
                    <p className="my-0 align-items-center">Novelty :</p>
                </div>
                <div className="col-8">
                    <div className="progress">
                        <div
                            className={
                                novelity < 7
                                    ? 'progress-bar bg-danger '
                                    : novelity < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{ width: `${Number(novelity) * 10 + '%'}` }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1 align-items-center">
                <div className="col-4">
                    <p className="my-0">Usefulness :</p>
                </div>
                <div className="col-8">
                    <div className="progress">
                        <div
                            className={
                                usefulness < 7
                                    ? 'progress-bar bg-danger '
                                    : usefulness < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(usefulness) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1 align-items-center">
                <div className="col-4">
                    <p className="my-0">Feasability :</p>
                </div>
                <div className="col-8">
                    <div className="progress">
                        <div
                            className={
                                feasability < 7
                                    ? 'progress-bar bg-danger '
                                    : feasability < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(feasability) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1 align-items-center">
                <div className="col-4">
                    <p className="my-0">Scalability :</p>
                </div>
                <div className="col-8">
                    <div className="progress">
                        <div
                            className={
                                scalability < 7
                                    ? 'progress-bar bg-danger '
                                    : scalability < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(scalability) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1 align-items-center">
                <div className="col-4 text-nowrap" >
                    <p className="my-0">Sustainability :</p>
                </div>
                <div className="col-8">
                    <div className="progress">
                        <div
                            className={
                                sustainability < 7
                                    ? 'progress-bar bg-danger '
                                    : sustainability < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(sustainability) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row mb-1 mt-2">
    <div className="col-5">
      <p className="my-0">Evaluated By :</p>
    </div>
    <div className="col-7">
      {props?.details?.evaluator_ratings.map((item, i) => (
        <p className="my-0" style={{ fontSize: '14px',  }} key={i}>
          {`${i + 1}: ${item.rated_evaluated_name}`}
        </p>
      ))}
    </div>
  </div>
  <hr />

            <div className="row mb-1 mt-2">
                <div className="col-5">
                    <p className="my-0">Comments :</p>
                </div>
                <div className="col-7">
    {props?.details?.evaluator_ratings?.map((item, i) => (
        <p className="my-0" key={i}style={{ fontSize: '14px', }}>
            {i + 1}: {item.comments}
        </p>
    ))}
</div>
              
            </div>
            <hr />
            <div className="row mb-1 mt-2">
                <div className="col-5">
                    <p className="my-0">Status :</p>
                </div>
                <div className="col-7">
                   
    {props?.details?.final_result !== null  ?  <span style={{color:"green"}}>L3 - Promoted</span> : <span style={{color:"red"}}>Not - Promoted</span>

    }
</div>
               
            </div>
        </div>
    );
};

export default RatedDetailCard;
