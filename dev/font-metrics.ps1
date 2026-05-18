param([string]$FontPath = 'assets\fonts\Quicksand-VariableFont_wght.ttf')

$bytes = [System.IO.File]::ReadAllBytes((Join-Path $PSScriptRoot "..\$FontPath"))

function ReadU32($b, $o) { ([uint32]$b[$o] -shl 24) -bor ([uint32]$b[$o+1] -shl 16) -bor ([uint32]$b[$o+2] -shl 8) -bor [uint32]$b[$o+3] }
function ReadU16($b, $o) { ([uint32]$b[$o] -shl 8) -bor [uint32]$b[$o+1] }
function ReadI16($b, $o) { $v = ([int]$b[$o] -shl 8) -bor [int]$b[$o+1]; if ($v -ge 32768) { return $v - 65536 }; return $v }
function ReadTag($b, $o) { [string][char]$b[$o] + [char]$b[$o+1] + [char]$b[$o+2] + [char]$b[$o+3] }

$numTables = ReadU16 $bytes 4
$headOff = 0; $os2Off = 0
for ($i = 0; $i -lt $numTables; $i++) {
    $r   = 12 + $i * 16
    $tag = ReadTag $bytes $r
    $off = ReadU32 $bytes ($r + 8)
    if ($tag -eq 'head') { $headOff = $off }
    if ($tag -eq 'OS/2') { $os2Off  = $off }
}

$upm           = ReadU16 $bytes ($headOff + 18)
$os2Version    = ReadU16 $bytes $os2Off
$typoAscender  = ReadI16 $bytes ($os2Off + 68)
$typoDescender = ReadI16 $bytes ($os2Off + 70)
$sxHeight      = ReadI16 $bytes ($os2Off + 86)
$sCapHeight    = ReadI16 $bytes ($os2Off + 88)

Write-Host "=== Font Metrics ($FontPath) ==="
Write-Host "unitsPerEm:     $upm"
Write-Host "OS/2 version:   $os2Version"
Write-Host "sTypoAscender:  $typoAscender"
Write-Host "sTypoDescender: $typoDescender  (negative = below baseline)"
Write-Host "sxHeight:       $sxHeight"
Write-Host "sCapHeight:     $sCapHeight"

$capR  = $sCapHeight    / $upm
$xhR   = $sxHeight      / $upm
$descR = [math]::Abs($typoDescender) / $upm

Write-Host ""
Write-Host "=== Ratios ==="
Write-Host ("capHeightRatio:  " + [math]::Round($capR,  4))
Write-Host ("xHeightRatio:    " + [math]::Round($xhR,   4))
Write-Host ("descenderRatio:  " + [math]::Round($descR, 4))

# Guide positions: top=30, middle=100, bottom=170, lower=240
# Uppercase/Ascenders: cap zone 30->170, width = 140
$fsUC    = [math]::Round(140.0 / $capR, 1)
$basUC   = 170

# Standard lowercase: x-height zone 100->170, width = 70
$fsLC    = [math]::Round(70.0 / $xhR, 1)
$basLC   = 170

# Ascender group same font-size as uppercase (fills 30->170)
$fsAsc   = $fsUC
$basAsc  = 170

# Descender: bowl 100->170, tail 170->240; total excl. ascender = 140
# fontSize * (xhR + descR) = 140
$fsDesc  = [math]::Round(140.0 / ($xhR + $descR), 1)
$basDesc = [math]::Round(240.0 - $fsDesc * $descR, 1)

# Verify
$capTop  = [math]::Round($basUC  - $fsUC   * $capR,  1)
$xTop    = [math]::Round($basLC  - $fsLC   * $xhR,   1)
$descBot = [math]::Round($basDesc + $fsDesc * $descR,  1)
$xTopD   = [math]::Round($basDesc - $fsDesc * $xhR,   1)

Write-Host ""
Write-Host "=== Computed FONT_CONFIG values ==="
Write-Host "fontSizeUC:        $fsUC    (cap-top should be y=30 → actual: $capTop)"
Write-Host "baselineUC:        $basUC"
Write-Host "fontSizeLC:        $fsLC    (x-height top should be y=100 → actual: $xTop)"
Write-Host "baselineLC:        $basLC"
Write-Host "fontSizeAscender:  $fsAsc"
Write-Host "baselineAscender:  $basAsc"
Write-Host "fontSizeDescender: $fsDesc  (x-top → $xTopD, desc-bottom → $descBot)"
Write-Host "baselineDescender: $basDesc"
