import React from 'react'
import IpfsUpload from '../ipfs-upload';
import DonorUpload from '../Donor-Upload';
import DonorForm from '../Forms/DonorForm';
import Modal from '../Forms/Modal';
import Button from 'react-bootstrap/Button';
import AddDonation from '../Forms/Modal'


const Donor = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh'
            }}>
                {/* <h1>Donor</h1> */}
            </div>
            <>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40vh'
                }}>
                    {/* <IpfsUpload /> */}
                    <DonorUpload />
                    {/* <DonorForm /> */}

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
        </>
    )
}

export default Donor
