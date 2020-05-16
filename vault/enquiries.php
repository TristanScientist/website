<?php

if (isset($_POST['submit'])) {
    $enquiry = $_POST['enquiry'];

    $mailto = "tristan@tristanhenderson.info";
    $txt = "".$enquiry;

    mail($mailto, "New Enquiry", $txt, "Enquiry")
    header("Location: enquiries.html?mailsend")
}