import React from 'react'
// import * as FaIcons from "react-icons/fa";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

function Navbar() {
    const [currAccount, setCurrentAccount] = React.useState("");
    /**
 * The following two funciton pertains to Metamask Auth:
 * 
 *  */
    const checkIfWalletIsConnected = () => {
        //First make sure we have access to window.ethereum
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Make sure you have metamask!")
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
                console.log(accounts);
                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log("Found an authorized account: ", account)
                    setCurrentAccount(account);
                } else {
                    console.log("No authorized account found");
                }
            })
    }
    //Function to Connect Metamask to app
    const connectWallet = () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Get metamask!")
        } else if(ethereum.networkVersion !== '1'){
            alert("Please Connect to Mainnet!");
        } else {

        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log("Connected", accounts[0])
                setCurrentAccount(accounts[0])
            })
            .catch(err => console.log(err));
        }
    }

    const disconnectWallet = () => {
        const { ethereum } = window;

        // Runs only they are brand new, or have hit the disconnect button
        setCurrentAccount(null);
        ethereum.request({
            method: 'wallet_requestPermissions', params: [{
                eth_accounts: {},
            }]
        })
            .then(accounts => {
                console.log("Disconnected", accounts[0])
                setCurrentAccount(null)
            })
            .catch(err => console.log(err));
    }
    React.useEffect(() => {
        checkIfWalletIsConnected()
    }, []);


    /**
     * Code Below is for the NavBar:
     * 
     *  */
    return (
        <>  
            <Nav>
                  <NavLink to="/">
                    <h1>The Giving Chain</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/donor" activeStyle>
                        Donor
                 </NavLink>
                    <NavLink to="/driver" activeStyle>
                        Driver
                 </NavLink>
                    <NavLink to="/ngo" activeStyle>
                        NGO
                 </NavLink>
                    <NavLink to="/recipient" activeStyle>
                        Recipient
                 </NavLink>
                </NavMenu>
                {currAccount ?
                    <NavBtn >
                        <NavBtnLink to='/' onClick={disconnectWallet} style={{
                            backgroundColor: 'green'
                        }}>Connected</NavBtnLink>
                    </NavBtn> :
                    <NavBtn>
                        <NavBtnLink to='/' onClick={connectWallet}>Connect Wallet</NavBtnLink>
                    </NavBtn>
                }
            </Nav>
        </>
    );
}

export default Navbar;
