<?php
ini_set('display_errors',1); 
//error_reporting(E_ALL);

require_once ('../../mysql_connect_staging.php');


$the_data = array(); //store everything on one array


//the issue id and name. We need the issue_id before starting second query
$query = "SELECT * FROM evict_data ORDER BY Featured desc";
//$query = "SELECT * FROM evict_data WHERE crimedisp = 'Convicted' ORDER BY featured desc";
$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
  $caseNumber = $row['UniqueID'];
  if ( !isset( $the_data[$caseNumber] ) ) {
    $the_data[$caseNumber] = array( 'case_num' => $caseNumber, 'data' => array(), 'address' => $row['Address'], 'lat' => $row['Latitude'], 'long' => $row['Longitude'], 'featured' => $row['Featured'], 'neighborhood' => $row['Neighborhood'], 'borough' => $row['Borough'], 'attorney' => $row['Attorney'], 'type' => $row['Type'], 'searches' => $row['Searches'], 'tco' => $row['TCO'], 'blurb' => $row['Blurb'], 'image' => $row['Image'], 'caption' => $row['Caption']);
  }
  $the_data[$caseNumber]['data'][] = array( 'name' => $row['Name'], 'age' => $row['Age'], 'race' => $row['Race'], 'crim_disp' => $row['CrimeDisp'], 'crime' => $row['Crime'], 'classification' => $row['Classification'] , 'sentence' => $row['Sentence']);
}


mysql_close($connection);

echo json_encode( array_values( $the_data ) );

function mysqlclean($array, $index, $maxlength, $connection)
{
  if (isset($array["{$index}"]))
  {
     $input = substr($array["{$index}"], 0, $maxlength);
     $input = mysql_real_escape_string($input, $connection);
     return ($input);
  }
  return NULL;
}


?>