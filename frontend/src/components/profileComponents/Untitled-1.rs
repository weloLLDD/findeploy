const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmsetPassword] = useState("");
  const toastId = React.useRef(null)



  const Toastobjects = {
    pauseOnFocusLoss : false,
    draggable:false,
    pauseOnHover:false,
    autoClose:2000
  }

  const dispatch = useDispatch();

  const userDetails = useSelector((state)=>state.userDetails);
  const {loading,error,user} =userDetails;

  useEffect(()=>{
    if(user){
      setName(user.name)
      setEmail(user.email)
    }
  },[dispatch,user])


const submitHandler =(e) =>{
  e.preventDefault();
  // password match
  if(password!== confirmpassword){
    toastId.current = toast.error("password does not match",Toastobjects)
  }
  else{
    //UPDATE PROFILE
    alert("password correct")
  }
}