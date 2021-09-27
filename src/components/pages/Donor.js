import React from 'react'
import IpfsUpload from '../ipfs-upload';
import DonorUpload from '../Donor-Upload';

const Donor = () => {
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
                    height: '30vh'
                }}>
                    {/* <IpfsUpload /> */}
                    <DonorUpload />
                   
                </div>
            </>
        </>
    )
}

export default Donor
