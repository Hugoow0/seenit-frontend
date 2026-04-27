pipeline {
    agent { label 'build-agent' }

    environment {
        DEPLOY_USER = 'ubuntu'
        DEPLOY_TARGET = '/var/www/frontend' 
    }

    stages {
        stage('Production Pipeline') {
            when { 
                expression { env.GIT_BRANCH == 'origin/main' || env.GIT_BRANCH == 'main' } 
            }
            
            stages {
                stage('Install') {
                    steps {
                        sh 'npm ci --include=dev'
                    }
                }

                stage('Test') {
                    steps {
                        echo "Running Vitest test suite..."
                        sh 'NODE_ENV=test CI=true npm run test'
                    }
                }

                stage('Build') {
                    steps {
                        sh '''
                        echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env
                        
                        echo "Building static Next.js export..."
                        npm run build
                        '''
                    }
                }

                stage('Deploy') {
                    steps {
                        sshagent(['frontend-ssh-key']) {
                            sh '''
                            echo "Packaging Next.js static export..."
                            tar -czf frontend-deploy.tar.gz out/

                            echo "Ensuring connection to Frontend Machine..."
                            mkdir -p ~/.ssh
                            ssh-keyscan -H $FRONTEND_IP >> ~/.ssh/known_hosts

                            echo "Transferring files to Frontend server..."
                            scp frontend-deploy.tar.gz $DEPLOY_USER@$FRONTEND_IP:/home/ubuntu/

                            echo "Executing deployment on Frontend server..."
                            ssh $DEPLOY_USER@$FRONTEND_IP "
                                tar -xzf frontend-deploy.tar.gz
                                
                                sudo mkdir -p $DEPLOY_TARGET
                                
                                sudo rm -rf $DEPLOY_TARGET/*
                                sudo cp -r out/* $DEPLOY_TARGET/
                                
                                sudo chown -R www-data:www-data $DEPLOY_TARGET
                                
                                rm frontend-deploy.tar.gz
                                rm -rf out/
                                
                                sudo systemctl reload nginx
                            "
                            '''
                        }
                    }
                }
            }
        }
    }
}
