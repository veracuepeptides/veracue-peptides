Get-ChildItem -Path "src" -Recurse -File -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '#5984c4') {
        $content = $content -replace '#5984c4', '#008B8B'
        Set-Content $_.FullName -Value $content
        Write-Host "Updated $($_.FullName)"
    }
}
