pipeline {
    agent any

    environment {
        NODE_VERSION = '22'
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
