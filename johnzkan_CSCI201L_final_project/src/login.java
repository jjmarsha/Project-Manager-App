
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;


/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private class userProject{
		@SuppressWarnings("unused")
		private int userID;
		@SuppressWarnings("unused")
		private int projectID;
		@SuppressWarnings("unused")
		private int isAdmin;
		@SuppressWarnings("unused")
		private String github;
		@SuppressWarnings("unused")
		private String name;
		public userProject(int userID, int projectID, int isAdmin, String github, String name) {
			this.userID = userID;
			this.projectID = projectID;
			this.isAdmin = isAdmin;
			this.github = github;
			this.name = name;
		}
	}
	private class error{
		@SuppressWarnings("unused")
		private String msg;
		public error(String msg) {
			this.msg = msg;
		}
	}
	private static final long serialVersionUID = 1L;
	public static final String CREDENTIALS_STRING = "jdbc:mysql://google/spoolDB?cloudSqlInstance=projectmanagement-259305:us-west1:projectmanagement&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false&user=projectManagement&password=CSCI201";
	static Connection connection = null;
	protected void service (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(CREDENTIALS_STRING);
			HttpSession session = request.getSession();
			String userName = request.getParameter("username");
			String passWord = request.getParameter("password");
			PreparedStatement ps = connection.prepareStatement("SELECT u.userName FROM user u WHERE u.userName= ? AND u.password = ?");
			ps.setString(1, userName);
			ps.setString(2, passWord);
			ResultSet rs = ps.executeQuery();
			if(!rs.next()) {
				error err = new error("Invalid username and password combination");
				String json = new Gson().toJson(err);
				response.setContentType("application/json");
				response.setHeader("Access-Control-Allow-Origin", "*");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
				connection.close();
			}
			else {
				PreparedStatement ps2 = connection.prepareStatement("SELECT u.userID, uip.projectID, u.isAdmin from user u, usersInProject uip WHERE u.userName = ? AND u.userID = uip.userID");
				ps2.setString(1, userName);
				ResultSet rs2 = ps2.executeQuery();
				while(rs2.next()) {
					int userID = rs2.getInt("userID");
					int projectID = rs2.getInt("projectID");
					int isAdmin = rs2.getInt("isAdmin");
					PreparedStatement ps3 = connection.prepareStatement("SELECT * FROM project WHERE projectID = ?");
					ps3.setInt(1, projectID);
					ResultSet rs3 = ps3.executeQuery();
					while(rs3.next()) {
						String projectName = rs3.getString("name");
						String github = rs3.getString("github");
						userProject up = new userProject(userID, projectID, isAdmin, github, projectName);
						String json = new Gson().toJson(up);
						session.setAttribute("projectID", projectID);
						session.setAttribute("userID", userID);
						session.setAttribute("isAdmin", isAdmin);
						response.setContentType("application/json");
						response.setCharacterEncoding("UTF-8");
						response.getWriter().write(json);
					}
				}
				//where is the redirect?
				connection.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

/** POSTMAN
Register: http://localhost:8080/johnzkan_CSCI201L_final_project/register?username=johnzkan&password=hihi123&samePass=hihi123
Login: http://localhost:8080/johnzkan_CSCI201L_final_project/login?username=John&password=123&samePass=123
http://localhost:8080/johnzkan_CSCI201L_final_project/projectUpdateServlet?github=newgithublink
*/
