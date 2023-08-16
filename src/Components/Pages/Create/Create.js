import { useRef, useState } from "react";
import "./Create.css"
import Swal from "sweetalert2";
const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    let titleRef = useRef();
    let bodyRef = useRef();
    const createPost = async () => {
        setLoading(true)
        try {
            let data = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            let res = await data.json();
            console.log(res);
            setLoading(false)

        } catch (error) {
            setError(error.message);
            setLoading(true);
        }
    }

    const handlerEvent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createPost();
            //-----------------------------add here sweetAlert------------------
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            );

            setTitle("");
            setBody("");  
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            titleRef.current.value = "";
            bodyRef.current.value = "";
        }
    };


    return (
        <>
            {loading && <div className="text-center"><span className="spinner-border spinner-border-sm text-danger mt-3" ></span></div>}

            {error && <div className="text-center"><p className="text-danger">{error}</p></div>}


            <h3 className="text-center mt-4 ">Create a Post</h3>

            <div className="create container mx-auto mt-3">
                <div className="row">

                    <div className="col-6 offset-3 bg-dark p-5 my-3 text-white">
                        <form onSubmit={(e) => handlerEvent(e)}>
                            <div className="d.block mb-4">
                                <label htmlFor="title" className="mb-1">Title:</label>
                                <input
                                    type="text"
                                    placeholder="title"
                                    className="form-control"
                                    onChange={(e) => setTitle(e.target.value)}
                                    ref={titleRef}
                                />
                                {title ? "" : <p className="warning">this filed is required</p>}

                                {title.length > 1 && title.length < 5 ? (
                                    <p className="text-warning" >less than 5 character</p>) : ("")}

                                {title.length > 16 ? (
                                    <p className="text-warning">more than 16 character</p>) : ("")}
                            </div>
                            <div className="d.block">
                                <label htmlFor="body" className="mb-1">Body:</label>
                                <textarea
                                    type="text"
                                    placeholder="body"
                                    className="form-control"
                                    onChange={(e) => setBody(e.target.value)}
                                    ref={bodyRef}
                                />
                                {body ? "" : <p className="warning">this filed is required</p>}

                                {body.length > 1 && body.length < 5 ? (
                                    <p className="text-warning" >less than 5 character</p>) : ("")}

                                {body.length > 50 ? (
                                    <p className="text-warning">more than 50 character</p>) : ("")}
                            </div>
                            <div className="d-block text-center mt-3">
                                <button className="btn btn-primary text-capitalize mt-4" disabled={title === "" || body === ""}>
                                    Create
                                </button>

                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </>
    );
}
export default Create;