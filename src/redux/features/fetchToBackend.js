const initialState = {
    allImages: [],
    activeImage: null
}

export const fetchToBackend = (state = initialState, action) => {
    switch (action.type) {

        case "fulfilled-allImage": 
        return {
            ...state,
            allImages: action.payload,
        }

        // дальше можно обрабатывать все три состояния 

        case "fulfilled-activeImage": 
        return {
            ...state,
            activeImage: action.payload,
        }

        case "clear": 
        return {
            ...state,
            activeImage: action.payload,
        }


        default: 
            return state;
    }
}

export const getAllImage = () => {
    return async(dispatch) => {
        try {
            const res  = await fetch('https://boiling-refuge-66454.herokuapp.com/images')
            const data = await res.json();

            dispatch({ type: "fulfilled-allImage", payload: data });
        } catch (e) {
            console.log(e)
        }
    }
}

export const getOneImage = (id) => {
    return async(dispatch) => {
        try {
            const res  = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
            const data = await res.json();
            console.log(data)

            dispatch({ type: "fulfilled-activeImage", payload: data });
        } catch (e) {
            console.log(e)
        }
    }
}

export const clearCash = () => {
    return async(dispatch) => {
        try {
            dispatch({ type: "clear", payload: null });
        } catch (e) {
            console.log(e)
        }
    }
}

export const submitComment = (id, comment) => {
    return async(dispatch) => {
        try {
            const res = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id:id, comment: comment, name: 'dfd' })
            })
            // const json = await res.json()
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
}



