<?php 
// if the url field is empty 
if(isset($_POST['url']) && $_POST['url'] == ''){
     // then send the form to your email
          mail( 'tristan@tristanhenderson.info', 'Contact Form', print_r($_POST,true) ); 
} 
// otherwise, let the spammer think that they got their message through
?>

<h1>Thanks</h1>

We'll get back to you as soon as possible