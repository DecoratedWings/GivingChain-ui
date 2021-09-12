import React from 'react'
import IpfsUpload from '../ipfs-upload';

const NGO = () => {
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh'
            }}>
                <h1>NGO</h1>
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

export default NGO
