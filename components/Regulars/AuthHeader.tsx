import Logo from "../../assets/images/logo-simple.png";

const AuthHeader = () => {
  return (
    <div className="auth-header d-flex align-items-center">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="content">
                        <div className="logo">
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthHeader