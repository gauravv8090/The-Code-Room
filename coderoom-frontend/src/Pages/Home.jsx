import React from 'react'
import logo from '../Assets/Code2.png'

const Home = () => {
  return (
    <div className='homepage' >

        <div className='formHome' >
            <img src={logo} className='homeLogo' alt="logo" />
            <h4 className='lable' >Paste invitation ROOM ID</h4>
            <div className='inputGroup' >

                <input type="text" className='inputBox' placeholder='ROOM ID' name="" id="" />
                <input type="text" className='inputBox' placeholder='User Name' name="" id="" />
                <button className='btn joinBtn'  >
                    Join
                </button>
                <span className='createInfo' > If you don't have an invite then create &nbsp;
                <a href="" className='createNewBtn' >new room</a>  </span>

            </div>

        </div>

        <footer>
            <h4>
                Built with &#x1F49B; by&nbsp; <a href="https://github.com/gauravv8090">Gaurav Agarwal</a>
            </h4>
        </footer>
        
    </div>
  )
}

export default Home