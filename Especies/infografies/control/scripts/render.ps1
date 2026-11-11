param([string]$Carpeta, [string]$Sortida)
$f = Get-ChildItem -LiteralPath $Carpeta -Filter *.pptx | Select-Object -First 1
New-Item -ItemType Directory -Force $Sortida | Out-Null
$pp = New-Object -ComObject PowerPoint.Application
$p = $pp.Presentations.Open($f.FullName, $true, $false, $false)
"slides: " + $p.Slides.Count + " size: " + $p.PageSetup.SlideWidth + "x" + $p.PageSetup.SlideHeight
foreach ($s in $p.Slides) { $s.Export("$Sortida\s$($s.SlideIndex).png", "PNG", 480, 270) }
$p.Close(); $pp.Quit()
