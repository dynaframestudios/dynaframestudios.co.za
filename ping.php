<?php
// Force ping to search engines
header('Content-Type: text/plain');
$url = "https://www.dynaframestudios.co.za";
$sitemap = $url . "/sitemap.xml";

// Ping Google
$google = file_get_contents("https://www.google.com/ping?sitemap=" . urlencode($sitemap));

// Ping Bing
$bing = file_get_contents("https://www.bing.com/ping?sitemap=" . urlencode($sitemap));

echo "PING RESULTS:\n";
echo "Google: " . ($google ? "SUCCESS" : "FAILED") . "\n";
echo "Bing: " . ($bing ? "SUCCESS" : "FAILED") . "\n";
echo "\nVisit: https://search.google.com/search-console";