import React from 'react'
import IpfsUpload from '../ipfs-upload';
import DonorUpload from '../Donor-Upload';
import DonorForm from '../Forms/DonorForm';
import Modal from '../Forms/Modal';
import Button from 'react-bootstrap/Button';
import AddDonation from '../Forms/Modal'
import NFTCard from '../Card';
import NFTUpdates from '../NFTUpdates';
import Album from '../Album'
import axios from 'axios'


const Donor = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const dataUrl = 'http://localhost:5000/api/v1/namespaces/images/data';

    const [data, setData] = React.useState(``);
    const [error, setError] = React.useState(``);

    function getNFTs(){
        axios.post(dataUrl)
            .then(response=>{
                console.log(response);
                setData(response);
            }).catch(error=>{
                console.log(error)
                setError(error)
            })
    }
    function getImageBlobs(id) {
        axios.post(`${dataUrl}/${id}/blob`)
        .then(response=>{
            console.log(response);
            setData(Object.keys(response[0]));
        }).catch(error=>{
            console.log(error)
            setError(error)
        })
    }

    return (
        <>
            <>
            <Album />

                <div style={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    height: '10vh',
                    padding:'2vh'
                }}>
                    {/* <IpfsUpload /> */}

                    {/* <DonorUpload /> */}

                    {/* <DonorForm /> */}
                    {/* <NFTUpdates /> */}

                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Add Donation
                    </Button>
  
                    <AddDonation
                     show={modalShow}
                        onHide={() => setModalShow(false)} 
                        childComponent={<DonorForm/>}/>
                    {/* <PracForm /> */}
                </div>
            </>
            {/* {getNFTs()} */}
            {/* <NFTCard img={data.value}/> */}

        </>
    )
}

export default Donor
