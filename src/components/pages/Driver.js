import React from 'react'
import IpfsUpload from '../ipfs-upload';
import Practice2 from '../Practice2';
import DriverUpdates from '../DriverUpdates';

const Driver = () => {
    return (
        <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh'
        }}>
            <h1>On Chain Transport Updates</h1>
        </div>
        <>
                {/* <Practice2 /> */}
                <DriverUpdates />
                {/* <IpfsUpload /> */}
        </>
    </>
    );
}

export default Driver
