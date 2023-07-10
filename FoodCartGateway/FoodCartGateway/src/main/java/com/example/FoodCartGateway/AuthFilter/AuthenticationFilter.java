package com.example.FoodCartGateway.AuthFilter;


import com.example.FoodCartGateway.Util.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthenticationFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = null;
            String requestPath = exchange.getRequest().getPath().value();
            if (validator.isSecured.test(exchange.getRequest())) {
                //header contains token or not
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }

                try {
                    jwtUtils.validateJwtToken(authHeader);
                    // Get the user's roles from the request or authentication context
                    List<String> userRoles = jwtUtils.getRoles(authHeader);
                    // Get the required role from the filter configuration
                    String requiredRole = config.getRequiredRole();

                    Boolean validUser = userRoles.contains(requiredRole) || (requestPath.startsWith("/foodmenu/api/menus/getMenus") && userRoles.contains("USER")) ||
                            (requestPath.startsWith("/foodorder/api/orders/orderDetails") && userRoles.contains("ADMIN"));

                    if (validUser) {
                        request = exchange.getRequest()
                                .mutate()
                                .header("loggedInUserId", jwtUtils.getUserId(authHeader).toString())
                                .header("username", jwtUtils.getUserNameFromJwtToken(authHeader))
                                .build();
                    }
                    else{
                        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                        return exchange.getResponse().setComplete();
                    }
                } catch (Exception e) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
            }
            return chain.filter(exchange.mutate().request(request).build());
        });
    }

    @Override
    public Config newConfig() {
        return new Config();
    }

    @Override
    public Class<Config> getConfigClass() {
        return Config.class;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Config {
        private String requiredRole;
    }
}