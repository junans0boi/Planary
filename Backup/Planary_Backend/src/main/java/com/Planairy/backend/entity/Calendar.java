@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String tag;
    private String tagColor;
    private String repeat;
    private String alarm;
    private String location;
    private String memo;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // 사용자 연결 (로그인한 사용자만 접근)
    private String userEmail; // or @ManyToOne User user;
}
