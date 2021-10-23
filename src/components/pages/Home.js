import React from 'react'
import Highway from '../video/Highway.mp4'
import HL from '../images/HL.jpg'
import FF from '../images/ffLogo.png'

const Home = () => {

    return (
            <>
            <video autoPlay loop muted
            style={{
                position:"absolute",
                width:"100%",
                left:"50%",
                top:"50%",
                height:"100%",
                objectFit:"cover",
                transform:"translate(-50%, -50%)",
                zIndex: "-1"
            }}>
                <source src={Highway} type="video/mp4" />
            </video>

            <div style={{
                margin:"20vh"
            }}>
            <h1 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh',
                color:"white",
                // margin:"20vh"
            }}>Blockchain Powering Generosity</h1>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '30vh',
                color:"white",
                // margin:"20vh"
            }}>
 
           {/* <img src={HL} alt="Logo" />; */}
           <img src={FF} alt="Logo"  
               style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'cover',
                width: '25%',
                height: '25%',
    //  marginRight: 10,
    //  marginBottom: 12,
    //  marginTop: 12
     }}/>
           </div>
           </div>

      
         </>
    )
}

export default Home
