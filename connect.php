<?php

if (isset($_POST['order_btn']))
{
    if (isset($_POST['name']) && 
     isset($_POST['number']) &&
    isset($_POST['email']) && isset($_POST['method']) &&
    isset($_POST['address1']) && isset($_POST['address2'])&& 
    isset($_POST['pin_code']))
    {
        $username = $_POST['name'];
        $mobile = $_POST['number'];
        $email = $_POST['email'];
       
        $payment = $_POST['method'];
        $address1 = $_POST['address1'];
        $address2 = $_POST['address2'];
        $pincode = $_POST['pin_code'];
        

         $host = "localhost";
         $dbUsername = "root";
         $dbPassword = "";
         $dbname = "wad project";
         
         $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);
         if(mysqli_connect_error())
         {
             die('Couldnt connect to database.');
         }
         else{
             $SELECT = "SELECT email From countering Where email = ? Limit 1 ";
             $INSERT = "INSERT INTO countering (username,mobile,email,payment,address1,address2,pincode) values (?, ?, ?, ?, ?, ?, ? )";
        
             $stmt = $conn->prepare($SELECT);
             $stmt->bind_param("s",$email);
             $stmt->execute();
             $stmt->bind_result($resultEmail);
             $stmt->store_result();
             $stmt->fetch();
             $rnum = $stmt->num_rows;
               
        
             if($rnum==0)
             {
                 $stmt->close();
                 $stmt=$conn->prepare($INSERT);
                 $stmt->bind_param("sissssi",$username, $mobile, $email, $payment, $address1, $address2, $pincode );
                 if ($stmt->execute())
                  {
                    echo "New record inserted sucessfully.";
                    header("Location:thankyou.html");
                
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Someone already registered using this email.";
            }

        }
             
             $stmt->close();
             $conn->close();
         
  }
    
    else
    {
        echo "All fields required.";
        die();
    }


}
else{
    echo "Order button not set";
}

?>
