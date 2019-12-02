
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

import java.sql.PreparedStatement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Servlet implementation class register
 */
@WebServlet("/register")
public class register extends HttpServlet {
	private class error {
		@SuppressWarnings("unused")
		private String msg;

		public error(String msg) {
			this.msg = msg;
		}
	}

	private static final long serialVersionUID = 1L;
	public static final String CREDENTIALS_STRING = "jdbc:mysql://google/spoolDB?cloudSqlInstance=projectmanagement-259305:us-west1:projectmanagement&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false&user=projectManagement&password=CSCI201";
	static Connection connection = null;

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			String userName = request.getParameter("username");
			String passWord = request.getParameter("password");
			String samePass = request.getParameter("samePass");

			String projectName = request.getParameter("projectName");
			String projectID = request.getParameter("projectID");

			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(CREDENTIALS_STRING);
			// validate user name password
			if (userName == null || passWord == null || samePass == null || userName == "" || passWord == ""
					|| samePass == "") {
				error err = new error("Please fill in all fields!");
				String json = new Gson().toJson(err);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			} else if (!passWord.equals(samePass)) {
				error err = new error("Passwords do not match!");
				String json = new Gson().toJson(err);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			} else {
				// validate projectID or projectName
				PreparedStatement ps = connection.prepareStatement("SELECT u.userName FROM user u WHERE u.userName= ?");
				ps.setString(1, userName);
				ResultSet rs = ps.executeQuery();
				if (rs.next()) {
					error err = new error("Username is already in use!");
					String json = new Gson().toJson(err);
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(json);
				} else {
					if ((projectID == null || projectID == "") && (projectName == null || projectName == "")) {
						error err = new error("Please Type in Project ID or create new Project in Project Name");
						String json = new Gson().toJson(err);
						response.setContentType("application/json");
						response.setCharacterEncoding("UTF-8");
						response.getWriter().write(json);
					} else if (projectID != "" && projectName != "") {
						error err = new error("Please ONLY type one: Project ID or Project Name");
						String json = new Gson().toJson(err);
						response.setContentType("application/json");
						response.setCharacterEncoding("UTF-8");
						response.getWriter().write(json);
					} else {
						// user wants to join a project
						if (projectID != null && projectID != "") {
							PreparedStatement findProject = connection
									.prepareStatement("SELECT * FROM project WHERE projectID = ?");
							findProject.setInt(1, Integer.parseInt(projectID));
							ResultSet projectRS = findProject.executeQuery();
							// project id doesn't exist
							if (!projectRS.next()) {
								error err = new error("Invalid project ID");
								String json = new Gson().toJson(err);
								response.setContentType("application/json");
								response.setCharacterEncoding("UTF-8");
								response.getWriter().write(json);
								// project id exists
							} else {
								PreparedStatement reg = connection.prepareStatement(
										"INSERT INTO user(userName, password, isAdmin) VALUES(?,?,?)",Statement.RETURN_GENERATED_KEYS);
								reg.setString(1, userName);
								reg.setString(2, passWord);
								reg.setInt(3, 0);
								reg.execute();
								System.out.println("user inserted");
								ResultSet otherRS = reg.getGeneratedKeys();
								if (otherRS.next()) {
									// get last userID that was inserted for the session
									int last_inserted_userid = otherRS.getInt(1);
									System.out.println("last inserted user id: " + last_inserted_userid);
									// session.setAttribute("currentUserID", last_inserted_id);
									PreparedStatement addUserInProject = connection.prepareStatement(
											"INSERT INTO usersInProject(projectID, userID, userName) VALUES (?,?,?)");
									addUserInProject.setInt(1, Integer.parseInt(projectID));
									addUserInProject.setInt(2, last_inserted_userid);
									addUserInProject.setString(3, userName);
									addUserInProject.execute();
									System.out.println("user added to project");
								}
							}
						}

						// user wants to create new project
						else if (projectName != null && projectName != "") {
							PreparedStatement reg = connection
									.prepareStatement("INSERT INTO user(userName, password, isAdmin) VALUES(?,?,?)",Statement.RETURN_GENERATED_KEYS);
							reg.setString(1, userName);
							reg.setString(2, passWord);
							reg.setInt(3, 0);
							reg.execute();
							System.out.println("user inserted");
							ResultSet otherRS = reg.getGeneratedKeys();
							if (otherRS.next()) {
								// get last userID that was inserted for the session
								int last_inserted_userid = otherRS.getInt(1);
								PreparedStatement newProject = connection
										.prepareStatement("INSERT INTO project(name, github) VALUES(?,?)",Statement.RETURN_GENERATED_KEYS);
								newProject.setString(1, projectName);
								newProject.setString(2, "No GitHub Repo Yet...");
								newProject.execute();
								ResultSet anotherRS = newProject.getGeneratedKeys();
								if (anotherRS.next()) {
									int last_inserted_projectid = anotherRS.getInt(1);
									System.out.println("last inserted project id: " + last_inserted_projectid);
									PreparedStatement addUserInProject = connection.prepareStatement(
											"INSERT INTO usersInProject(projectID, userID, userName) VALUES (?,?,?)");
									addUserInProject.setInt(1, last_inserted_projectid);
									addUserInProject.setInt(2, last_inserted_userid);
									addUserInProject.setString(3, userName);
									addUserInProject.execute();
									System.out.println("user in project");
								}
							}
						}
					}
				}
			}
			// where is the redirect?
			// to login

			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
