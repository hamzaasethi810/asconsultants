# """PostgreSQL database setup and operations for luxury concierge inquiries."""
# import psycopg2
# from psycopg2 import Error, sql
# import os
# from dotenv import load_dotenv

# load_dotenv()

# class Database:
#     def __init__(self):
#         self.host = os.getenv('DB_HOST', 'localhost')
#         self.user = os.getenv('DB_USER', 'postgres')
#         self.password = os.getenv('DB_PASSWORD', '')
#         self.database = os.getenv('DB_NAME', 'luxury_concierge')
#         self.port = os.getenv('DB_PORT', '5432')
        
#     def create_connection(self):
#         """Create a database connection."""
#         try:
#             connection = psycopg2.connect(
#                 host=self.host,
#                 user=self.user,
#                 password=self.password,
#                 database=self.database,
#                 port=self.port
#             )
#             return connection
#         except Error as e:
#             print(f"❌ Error connecting to PostgreSQL: {e}")
#             return None
    
#     def create_database_and_table(self):
#         """Create database and inquiries table if they don't exist."""
#         connection = None
#         cursor = None
#         try:
#             # First connect to default postgres database to create our database
#             connection = psycopg2.connect(
#                 host=self.host,
#                 user=self.user,
#                 password=self.password,
#                 database='postgres',  # Connect to default database first
#                 port=self.port
#             )
#             connection.autocommit = True
#             cursor = connection.cursor()
            
#             # Create database if it doesn't exist
#             cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{self.database}'")
#             exists = cursor.fetchone()
#             if not exists:
#                 cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(self.database)))
#                 print(f"✅ Database '{self.database}' created successfully")
#             else:
#                 print(f"✅ Database '{self.database}' already exists")
            
#             cursor.close()
#             connection.close()
            
#             # Now connect to our database and create the table
#             connection = psycopg2.connect(
#                 host=self.host,
#                 user=self.user,
#                 password=self.password,
#                 database=self.database,
#                 port=self.port
#             )
#             cursor = connection.cursor()
            
#             # Create inquiries table
#             create_table_query = """
#             CREATE TABLE IF NOT EXISTS inquiries (
#                 id SERIAL PRIMARY KEY,
#                 name VARCHAR(255) NOT NULL,
#                 email VARCHAR(255) NOT NULL,
#                 phone VARCHAR(50),
#                 service VARCHAR(255),
#                 message TEXT NOT NULL,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                 status VARCHAR(50) DEFAULT 'received'
#             )
#             """
#             cursor.execute(create_table_query)
#             connection.commit()
#             print("✅ PostgreSQL inquiries table created successfully")
            
#         except Error as e:
#             print(f"❌ Error creating database/table: {e}")
#             raise e
#         finally:
#             if cursor:
#                 cursor.close()
#             if connection:
#                 connection.close()
    
#     def save_inquiry(self, name, email, phone, service, message):
#         """Save inquiry to database."""
#         connection = self.create_connection()
#         if connection is None:
#             return None
            
#         try:
#             cursor = connection.cursor()
#             insert_query = """
#             INSERT INTO inquiries (name, email, phone, service, message)
#             VALUES (%s, %s, %s, %s, %s)
#             RETURNING id
#             """
#             values = (name, email, phone, service, message)
#             cursor.execute(insert_query, values)
#             inquiry_id = cursor.fetchone()[0]
#             connection.commit()
#             print(f"✅ Inquiry saved successfully with ID: {inquiry_id}")
#             return inquiry_id
            
#         except Error as e:
#             print(f"❌ Error saving inquiry: {e}")
#             return None
#         finally:
#             if cursor:
#                 cursor.close()
#             if connection:
#                 connection.close()
    
#     def get_all_inquiries(self):
#         """Retrieve all inquiries from the database."""
#         connection = self.create_connection()
#         if connection is None:
#             return []
            
#         try:
#             cursor = connection.cursor()
#             cursor.execute("""
#                 SELECT id, name, email, phone, service, message, created_at, status
#                 FROM inquiries
#                 ORDER BY created_at DESC
#             """)
            
#             inquiries = cursor.fetchall()
            
#             # Convert to list of dictionaries
#             inquiry_list = []
#             for inquiry in inquiries:
#                 inquiry_list.append({
#                     'id': inquiry[0],
#                     'name': inquiry[1],
#                     'email': inquiry[2],
#                     'phone': inquiry[3],
#                     'service': inquiry[4],
#                     'message': inquiry[5],
#                     'created_at': inquiry[6].isoformat() if inquiry[6] else None,
#                     'status': inquiry[7]
#                 })
            
#             return inquiry_list
            
#         except Error as e:
#             print(f"❌ Error retrieving inquiries: {e}")
#             return []
#         finally:
#             if cursor:
#                 cursor.close()
#             if connection:
#                 connection.close()
    
#     def get_inquiry_by_id(self, inquiry_id):
#         """Retrieve a specific inquiry by ID."""
#         connection = self.create_connection()
#         if connection is None:
#             return None
            
#         try:
#             cursor = connection.cursor()
#             cursor.execute("""
#                 SELECT id, name, email, phone, service, message, created_at, status
#                 FROM inquiries
#                 WHERE id = %s
#             """, (inquiry_id,))
            
#             inquiry = cursor.fetchone()
            
#             if inquiry:
#                 return {
#                     'id': inquiry[0],
#                     'name': inquiry[1],
#                     'email': inquiry[2],
#                     'phone': inquiry[3],
#                     'service': inquiry[4],
#                     'message': inquiry[5],
#                     'created_at': inquiry[6].isoformat() if inquiry[6] else None,
#                     'status': inquiry[7]
#                 }
#             return None
            
#         except Error as e:
#             print(f"❌ Error retrieving inquiry: {e}")
#             return None
#         finally:
#             if cursor:
#                 cursor.close()
#             if connection:
#                 connection.close()
