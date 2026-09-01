Add-Type -AssemblyName System.Drawing

$baseImgPath = 'C:\Users\MY-Khan\.gemini\antigravity\brain\6ab2887e-7c3d-4f31-9a5c-dcb6dbc7d697\.user_uploaded\media_1787808910366.jpg'
$logoPath = 'C:\Users\MY-Khan\.gemini\antigravity\brain\6ab2887e-7c3d-4f31-9a5c-dcb6dbc7d697\.user_uploaded\media_1787809727556.png'
$outputPath = 'e:\yousafzai-latest-website-main\yousafzai-latest-website-main\frontend\src\components\SupplyChainJourney\image.jpg'

$truckImg = [System.Drawing.Image]::FromFile($baseImgPath)
$logoImg = [System.Drawing.Image]::FromFile($logoPath)

$bmp = New-Object System.Drawing.Bitmap($truckImg)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Target dimensions and position
$ul = New-Object System.Drawing.PointF(500, 300)
$ur = New-Object System.Drawing.PointF(900, 335)
$ll = New-Object System.Drawing.PointF(500, 424)
$points = [System.Drawing.PointF[]]($ul, $ur, $ll)

$g.DrawImage($logoImg, $points)

$g.Dispose()
$truckImg.Dispose()
$logoImg.Dispose()

Remove-Item $outputPath -Force -ErrorAction SilentlyContinue
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

