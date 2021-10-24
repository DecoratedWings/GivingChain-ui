import React, { Component } from 'react';


class Practice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        //http://localhost:5000/namespaces

        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        // .then(json => console.log(json))
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });

    }


    render() {

        var {isLoaded, items} = this.state;
        if(!isLoaded){
            return <div>Loading ...</div>
        }
        return (
            <div> 
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                Data has been loaded.
                <br/>
                <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} | {item.email}
                    </li>
                ))}
                </ul>
            </div>
        );
    }
}

export default Practice;
