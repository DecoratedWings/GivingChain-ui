import React from 'react'
import IpfsUpload from '../ipfs-upload';

const Donor = () => {
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh'
            }}>
                <h1>Donor</h1>
            </div>
            <>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '30vh'
                }}>
                    <IpfsUpload />
                </div>
            </>
        </>
    )
}

export default Donor
