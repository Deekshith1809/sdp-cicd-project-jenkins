pipeline {
    agent any

    tools {
        maven 'Maven_3.9.11'   // Name you configured in "Global Tool Configuration"
        jdk 'JDK21'            // (Optional) If you configured JDK in Jenkins
    }

    stages {
        // ===== CHECKOUT CODE =====
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ===== BUILD FRONTEND =====
        stage('Build Frontend') {
            steps {
                dir('artgalleryproj(fsad)') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== DEPLOY FRONTEND TO TOMCAT =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend"
                xcopy /E /I /Y artgalleryproj(fsad)\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend"
                '''
            }
        }

        // ===== BUILD BACKEND =====
        stage('Build Backend') {
            steps {
                dir('SpringBootProjectBackend') {
                    withMaven(maven: 'Maven_3.9.11') {
                        bat 'mvn clean package'
                    }
                }
            }
        }

        // ===== DEPLOY BACKEND TO TOMCAT =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend.war"
                )
                copy SpringBootProjectBackend\\target\\artgallery-backend.war "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
