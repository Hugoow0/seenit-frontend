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
                        sh 'npm ci'
                    }
                }

                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                }

                stage('Deploy') {
                    steps {
                        sshagent(['frontend-ssh-key']) {
                            sh '''
                            echo "Packaging frontend build..."
                            tar -czf frontend-deploy.tar.gz out/

                            echo "Ensuring connection to Frontend Machine..."
                            mkdir -p ~/.ssh
                            ssh-keyscan -H $FRONTEND_IP >> ~/.ssh/known_hosts

                            echo "Transferring files to Frontend server..."
                            scp frontend-deploy.tar.gz $DEPLOY_USER@$FRONTEND_IP:/home/ubuntu/

                            echo "Executing deployment on Frontend server..."
                            ssh $DEPLOY_USER@$FRONTEND_IP "
                                # Extract the files in the ubuntu home directory
                                tar -xzf frontend-deploy.tar.gz
                                
                                # Create the web directory if it does not exist
                                sudo mkdir -p $DEPLOY_TARGET
                                
                                # Clear out the old website and move the new one in
                                sudo rm -rf $DEPLOY_TARGET/*
                                sudo cp -r out/* $DEPLOY_TARGET/
                                
                                # Nginx requires the 'www-data' user to own these files
                                sudo chown -R www-data:www-data $DEPLOY_TARGET
                                
                                # Clean up the temporary files from the home directory
                                rm frontend-deploy.tar.gz
                                rm -rf out/
                                
                                # Tell Nginx to apply the new files
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