pipeline {
    agent any

    environment {
        NODE_VERSION = '20'    // Change to your node version if needed
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set up Node') {
            steps {
                script {
                    // Install node using nvm or system (optional step based on Jenkins setup)
                    echo "Using Node.js version ${NODE_VERSION}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('project') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Project') {
            steps {
                dir('project') {
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Build Output') {
            steps {
                dir('project') {
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                }
            }
        }

        // Optional - you can add a deploy stage if needed
        /*
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Your deploy commands here (like Docker push, SCP to server, etc.)
            }
        }
        */
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed. Check errors above!'
        }
    }
}
