<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $announcement->title }}</title>
    <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;  margin:0;   }
        .wrapper { max-width:600px; margin:0 auto; }
        .card { background:#ffffff; overflow:hidden; border:1px solid #e5e7eb; }

        .header { background:linear-gradient(135deg,#0f766e,#14b8a6); padding:40px 30px; color:white; display:flex; align-items:center; }

        
        .logo-circle { width:100px; height:auto; display:flex; align-items:center; justify-content:center; }
        .logo-circle img { width: 100%; height: auto; display: block; }
        .header-text { margin-left:12px; }
        .header-text .company { font-size:24px; font-weight:600; opacity:.9; }
        .header-text .sub { font-size:14px; opacity:.75; }
        

        .content { padding:24px; color:#0f172a; }

        .user-info {  display:flex; align-items:center; margin-bottom:28px;}
        .user-photo { width:50px; height:50px; border-radius:50%; overflow:hidden; margin-right:12px; background:#e5e7eb; }
        .user-photo img {width:100%; height:100%; object-fit:cover; }
        .user-greeting { font-size:14px; font-weight:600; color:#0f172a; }

        .title {font-size:18px; font-weight:700; margin-bottom:8px; }
        .meta {font-size:12px; color:#6b7280; margin-bottom:24px; }

        .body { font-size:14px; line-height:1.7; white-space:pre-line; margin-bottom:40px; padding-bottom:24;}

        .footer {padding:40px 40px 40px; font-size:11px; color:#6b7280; border-top:1px solid #e5e7eb; background:#f9fafb; text-align:center; margin-x:50px;  }
        .tag { display:inline-block; line-height: 1; align-items:center; font-size:12px; padding:4px 12px; border-radius:999px; background:#ecfeff; color:#0f766e; font-weight:600; margin-top:10px;}
    </style>
</head>
<body>
<div class="wrapper">
    <div class="card">

        <div class="header">
            <div class="logo-circle">
                <img src="https://www.pupuk-kujang.co.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_mobile_light.891ce27a.png&w=1920&q=75" 
             alt="Logo" 
             style="width: 100%; height: auto;">
            </div>
            <div class="header-text">
                <div class="company">PT PUPUK KUJANG</div>
                <div class="sub">Sistem Pengumuman Karyawan</div>

                @if($announcement->sender)
                    <div class="tag">{{ $announcement->sender }}</div>
                @endif
            </div>
        </div>

        
        <div class="content">

            
                            

                



            <div class="title">{{ $announcement->title }}</div>

            <div class="meta">
                Dikirim pada {{ $announcement->sent_at?->format('d M Y H:i') ?? now()->format('d M Y H:i') }}
            </div>

            <div class="user-info">
                    
                    <div class="user-greeting">
                        Yth, {{ $employee->name }}!
                    </div>
                </div>

            <div class="body">
                {!! $announcement->body !!}
            </div>

        </div>

        <div class="footer">
            Email ini dikirim secara otomatis oleh sistem pengumuman karyawan.
            Jika Anda merasa tidak berkepentingan menerima email ini, harap abaikan.
        </div>

        @if(isset($recipient) && $recipient->id)
            <img src="{{ URL::signedRoute('email.track', ['id' => $recipient->id]) }}" 
                 alt="" 
                 width="1" 
                 height="1" 
                 style=" width:1px; height:1px; opacity:0;" />
        @endif

    </div>
</div>

    </div>
</div>

</body>
</html>
