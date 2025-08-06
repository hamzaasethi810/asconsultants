"""Database setup and operations for luxury concierge inquiries."""
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.host = os.getenv('DB_HOST', 'localhost')
        self.user = os.getenv('DB_USER', 'root')
        self.password = os.getenv('DB_PASSWORD', '')
        self.database = os.getenv('DB_NAME', 'luxury_concierge')
        
    def create_connection(self):
        """Create a database connection."""
        try:
            connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            return connection
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return None
    
    def create_database_and_table(self):
        """Create database and inquiries table if they don't exist."""
        connection = None
        cursor = None
        try:
            # First connect without specifying database to create it
            connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password
            )
            cursor = connection.cursor()
            
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {self.database}")
            cursor.execute(f"USE {self.database}")
            
            # Create inquiries table
            create_table_query = """
            CREATE TABLE IF NOT EXISTS inquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                service VARCHAR(255),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) DEFAULT 'received'
            )
            """
            cursor.execute(create_table_query)
            connection.commit()
            print("✅ MySQL database and table created successfully")
            
        except Error as e:
            print(f"❌ Error creating database/table: {e}")
            raise e
        finally:
            if cursor:
                cursor.close()
            if connection and connection.is_connected():
                connection.close()
    
    def save_inquiry(self, name, email, phone, service, message):
        """Save inquiry to database."""
        connection = self.create_connection()
        if connection is None:
            return None
            
        try:
            cursor = connection.cursor()
            insert_query = """
            INSERT INTO inquiries (name, email, phone, service, message)
            VALUES (%s, %s, %s, %s, %s)
            """
            values = (name, email, phone, service, message)
            cursor.execute(insert_query, values)
            connection.commit()
            inquiry_id = cursor.lastrowid
            print(f"✅ Inquiry saved successfully with ID: {inquiry_id}")
            return inquiry_id
            
        except Error as e:
            print(f"Error saving inquiry: {e}")
            return False
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
