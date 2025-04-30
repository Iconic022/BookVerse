pipeline {
    agent any

    environment {
        NODE_VERSION = '22'  // Updated to match your actual Node version
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
                    echo "Using Node.js version ${NODE_VERSION}"
                    // Optional: Ensure correct Node version is used (if nvm or node tool plugin is available)
                    // For example: tool name: 'NodeJS 22' if configured in Jenkins
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run dev'
            }
        }

        stage('Archive Build Output') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
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
