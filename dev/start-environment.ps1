Write-Output 'Create shared docker network...'
docker network create lse-data-analysis
Write-Output 'Docker compose build environment...'
docker-compose -f environment/docker-compose.yml build
Write-Output 'Docker compose up environment...'
docker-compose -f environment/docker-compose.yml up -d 
echo 'Sleep for 5...'
Start-Sleep -Seconds 5
echo 'Execute mongo setup...'
docker exec -it mongodb mongosh --eval "load('/db/init.js')"
echo 'Sleep for 5...'
Start-Sleep -Seconds 30

cd ..

# set AWS credentials for localstack
$env:AWS_CONFIG_FILE ="$(Get-Location)\dev\environment\config"
$env:AWS_SHARED_CREDENTIALS_FILE ="$(Get-Location)\dev\environment\credentials"

npm run remove-cdkout
npm run bootstrap-localstack

$bootstrapRoles = @(
    'cdk-hnb659fds-deploy-role-000000000000-eu-west-1',
    'cdk-hnb659fds-file-publishing-role-000000000000-eu-west-1',
    'cdk-hnb659fds-image-publishing-role-000000000000-eu-west-1',
    'cdk-hnb659fds-lookup-role-000000000000-eu-west-1',
    'cdk-hnb659fds-cfn-exec-role-000000000000-eu-west-1'
)

ForEach ($role in $bootstrapRoles) {
    aws iam attach-role-policy --role-name $role --policy-arn arn:aws:iam::aws:policy/AdministratorAccess --region eu-west-1 --endpoint-url http://localhost:4566
}

npm run deploy-localstack
cd dev 