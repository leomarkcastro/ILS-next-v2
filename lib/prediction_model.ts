export function predict_from_survey(input_survey) {
  let Age,
    ExplainDiagrams,
    FinishProject,
    Gender,
    LearnWithVideo,
    ListenToLecture,
    ListeningOfDiscussions,
    ListeningToLectures,
    ListeningToNews,
    OralDirections,
    OrganizingTools,
    Picture,
    Posters,
    Reading,
    Religion,
    RememberByWriting,
    VisualAids,
    cur_type,
    family_type,
    municipality,
    section,
    specialization,
    year;
  ListeningOfDiscussions = input_survey["ListeningOfDiscussions"];
  ListenToLecture = input_survey["ListenToLecture"];
  OrganizingTools = input_survey["OrganizingTools"];
  Reading = input_survey["Reading"];
  family_type = input_survey["family_type"];
  section = input_survey["section"];
  year = input_survey["year"];
  Picture = input_survey["Picture"];
  VisualAids = input_survey["VisualAids"];
  Religion = input_survey["Religion"];
  Posters = input_survey["Posters"];
  Gender = input_survey["Gender"];
  specialization = input_survey["specialization"];
  municipality = input_survey["municipality"];
  LearnWithVideo = input_survey["LearnWithVideo"];
  FinishProject = input_survey["FinishProject"];
  RememberByWriting = input_survey["RememberByWriting"];
  ListeningToNews = input_survey["ListeningToNews"];
  Age = input_survey["Age"];
  OralDirections = input_survey["OralDirections"];
  ListeningToLectures = input_survey["ListeningToLectures"];
  ExplainDiagrams = input_survey["ExplainDiagrams"];
  if (LearnWithVideo < "2.5") {
    if (ListeningToLectures < "2.5") {
      if (section === "A") {
        if (year < "1.5") {
          if (FinishProject < "3.5") {
            if (municipality === "SAN MIGUEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "HAGONOY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BULACAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "GUIGUINTO") {
              cur_type = "SRSVis";
            }
            if (municipality === "BALAGTAS (BIGAA)") {
              cur_type = "SRSVis";
            }
            if (municipality === "SANTA MARIA") {
              cur_type = "SRSVis";
            }
            if (municipality === "PANDI") {
              cur_type = "SASVis";
            }
            if (municipality === "MARILAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "MEYCAUAYAN CITY") {
              cur_type = "GRIVer";
            }
            if (municipality === "PLARIDEL") {
              if (family_type === "Nuclear Family") {
                cur_type = "SASVis";
              }
              if (family_type === "Extended Family") {
                cur_type = "SRSVis";
              }
              if (family_type === " Single") {
                cur_type = "GRIVer";
              }
              if (family_type === "Grand Parent Family") {
                cur_type = "SRSVis";
              }
              if (family_type === " Step Family") {
                cur_type = "SRSVis";
              }
            }
            if (municipality === "PULILAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "PAOMBONG") {
              cur_type = "SRSVis";
            }
            if (municipality === "CALUMPIT") {
              cur_type = "GASVer";
            }
            if (municipality === "MALOLOS CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN RAFAEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN JOSE DEL MONTE CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BOCAUE") {
              cur_type = "SRSVis";
            }
            if (municipality === "MINALIN") {
              cur_type = "SRSVis";
            }
            if (municipality === "NORZAGARAY") {
              cur_type = "SRSVis";
            }
            if (municipality === "OBANDO") {
              cur_type = "SAIVis";
            }
            if (municipality === "BUSTOS") {
              cur_type = "SRSVis";
            }
            if (municipality === "BALIUAG") {
              cur_type = "SRSVis";
            }
            if (municipality === "ANGELES CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "APALIT") {
              cur_type = "SRSVis";
            }
            if (
              municipality ===
              "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
            ) {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN ILDEFONSO") {
              cur_type = "SRSVis";
            }
            if (municipality === "GUAGUA") {
              cur_type = "SRSVis";
            }
            if (municipality === "FLORIDABLANCA") {
              cur_type = "SRSVis";
            }
            if (municipality === "CARRANGLAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "LUBAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "ARAYAT") {
              cur_type = "SAIVis";
            }
          }
          if (FinishProject >= "3.5") {
            cur_type = "SRSVis";
          }
        }
        if (year >= "1.5") {
          cur_type = "SASVis";
        }
      }
      if (section === "L") {
        cur_type = "SRSVis";
      }
      if (section === "D") {
        cur_type = "GAIVer";
      }
      if (section === "F") {
        cur_type = "SRSVis";
      }
      if (section === "G") {
        cur_type = "SAIVis";
      }
      if (section === "K") {
        cur_type = "SASVis";
      }
      if (section === "C") {
        cur_type = "SASVer";
      }
      if (section === "E") {
        if (Gender === "Female") {
          cur_type = "GASVer";
        }
        if (Gender === "Male") {
          if (OrganizingTools < "4.5") {
            cur_type = "GAIVer";
          }
          if (OrganizingTools >= "4.5") {
            cur_type = "SASVer";
          }
        }
      }
      if (section === "R") {
        cur_type = "SRSVis";
      }
      if (section === "B") {
        cur_type = "SASVis";
      }
      if (section === "O") {
        cur_type = "SRSVis";
      }
      if (section === "I") {
        cur_type = "SRSVis";
      }
      if (section === "H") {
        cur_type = "SRSVis";
      }
      if (section === "J") {
        cur_type = "SRSVis";
      }
      if (section === "P") {
        cur_type = "SRSVis";
      }
      if (section === "Q") {
        cur_type = "SRSVis";
      }
      if (section === "M") {
        cur_type = "SRSVis";
      }
      if (section === "S") {
        cur_type = "SRSVis";
      }
      if (section === "W") {
        cur_type = "SRSVis";
      }
    }
    if (ListeningToLectures >= "2.5") {
      if (municipality === "SAN MIGUEL") {
        cur_type = "SRSVis";
      }
      if (municipality === "HAGONOY") {
        if (year < "3.5") {
          if (Age < "19.5") {
            cur_type = "SAIVer";
          }
          if (Age >= "19.5") {
            if (VisualAids < "4.5") {
              cur_type = "SAIVer";
            }
            if (VisualAids >= "4.5") {
              cur_type = "GAIVis";
            }
          }
        }
        if (year >= "3.5") {
          if (specialization === "Business Analytics") {
            cur_type = "GASVis";
          }
          if (specialization === "Web and Mobile Development") {
            cur_type = "SRSVis";
          }
          if (specialization === "Service Management") {
            if (ListeningToLectures < "4.5") {
              cur_type = "SASVis";
            }
            if (ListeningToLectures >= "4.5") {
              cur_type = "SRSVis";
            }
          }
          if (specialization === "Not Applicable") {
            cur_type = "SRSVis";
          }
        }
      }
      if (municipality === "BULACAN") {
        if (Reading < "2.5") {
          if (OrganizingTools < "4.5") {
            cur_type = "SASVer";
          }
          if (OrganizingTools >= "4.5") {
            cur_type = "SRSVer";
          }
        }
        if (Reading >= "2.5") {
          if (Posters < "2.5") {
            cur_type = "SRSVis";
          }
          if (Posters >= "2.5") {
            cur_type = "SASVis";
          }
        }
      }
      if (municipality === "GUIGUINTO") {
        if (specialization === "Business Analytics") {
          cur_type = "SRSVis";
        }
        if (specialization === "Web and Mobile Development") {
          cur_type = "SRSVis";
        }
        if (specialization === "Service Management") {
          cur_type = "SASVis";
        }
        if (specialization === "Not Applicable") {
          cur_type = "GAIVer";
        }
      }
      if (municipality === "BALAGTAS (BIGAA)") {
        cur_type = "SRSVis";
      }
      if (municipality === "SANTA MARIA") {
        cur_type = "SRSVis";
      }
      if (municipality === "PANDI") {
        cur_type = "SRSVis";
      }
      if (municipality === "MARILAO") {
        cur_type = "GASVis";
      }
      if (municipality === "MEYCAUAYAN CITY") {
        cur_type = "GASVis";
      }
      if (municipality === "PLARIDEL") {
        cur_type = "SRIVer";
      }
      if (municipality === "PULILAN") {
        cur_type = "SASVer";
      }
      if (municipality === "PAOMBONG") {
        cur_type = "SRSVis";
      }
      if (municipality === "CALUMPIT") {
        cur_type = "SRSVis";
      }
      if (municipality === "MALOLOS CITY") {
        if (Reading < "4.5") {
          if (Age < "19.5") {
            if (Gender === "Female") {
              if (OralDirections < "4.5") {
                if (year < "2.5") {
                  cur_type = "SRIVis";
                }
                if (year >= "2.5") {
                  cur_type = "GRIVer";
                }
              }
              if (OralDirections >= "4.5") {
                if (ListeningToNews < "4.5") {
                  cur_type = "GASVer";
                }
                if (ListeningToNews >= "4.5") {
                  cur_type = "GAIVer";
                }
              }
            }
            if (Gender === "Male") {
              if (ListenToLecture < "4.5") {
                cur_type = "GASVis";
              }
              if (ListenToLecture >= "4.5") {
                cur_type = "SRIVer";
              }
            }
          }
          if (Age >= "19.5") {
            if (Gender === "Female") {
              cur_type = "SRSVer";
            }
            if (Gender === "Male") {
              cur_type = "SAIVer";
            }
          }
        }
        if (Reading >= "4.5") {
          if (ListeningOfDiscussions < "4.5") {
            cur_type = "SAIVis";
          }
          if (ListeningOfDiscussions >= "4.5") {
            if (year < "3.5") {
              cur_type = "SAIVer";
            }
            if (year >= "3.5") {
              if (Gender === "Female") {
                cur_type = "SASVer";
              }
              if (Gender === "Male") {
                cur_type = "SRSVis";
              }
            }
          }
        }
      }
      if (municipality === "SAN RAFAEL") {
        cur_type = "SRSVis";
      }
      if (municipality === "SAN JOSE DEL MONTE CITY") {
        cur_type = "SASVer";
      }
      if (municipality === "BOCAUE") {
        cur_type = "SRSVis";
      }
      if (municipality === "MINALIN") {
        cur_type = "SRSVis";
      }
      if (municipality === "NORZAGARAY") {
        cur_type = "SRSVis";
      }
      if (municipality === "OBANDO") {
        cur_type = "SRSVis";
      }
      if (municipality === "BUSTOS") {
        cur_type = "SASVer";
      }
      if (municipality === "BALIUAG") {
        cur_type = "SRSVis";
      }
      if (municipality === "ANGELES CITY") {
        cur_type = "SRSVis";
      }
      if (municipality === "APALIT") {
        cur_type = "SRSVis";
      }
      if (
        municipality === "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
      ) {
        cur_type = "SRSVis";
      }
      if (municipality === "SAN ILDEFONSO") {
        cur_type = "SRSVis";
      }
      if (municipality === "GUAGUA") {
        cur_type = "SRSVis";
      }
      if (municipality === "FLORIDABLANCA") {
        cur_type = "SASVer";
      }
      if (municipality === "CARRANGLAN") {
        cur_type = "SRSVis";
      }
      if (municipality === "LUBAO") {
        cur_type = "SRSVis";
      }
      if (municipality === "ARAYAT") {
        cur_type = "SRSVis";
      }
    }
  }
  if (LearnWithVideo >= "2.5") {
    if (specialization === "Business Analytics") {
      if (ListeningOfDiscussions < "3.5") {
        if (FinishProject < "4.5") {
          if (Gender === "Female") {
            if (year < "3.5") {
              cur_type = "SASVis";
            }
            if (year >= "3.5") {
              cur_type = "GASVis";
            }
          }
          if (Gender === "Male") {
            if (ExplainDiagrams < "3.5") {
              cur_type = "SAIVer";
            }
            if (ExplainDiagrams >= "3.5") {
              cur_type = "GAIVer";
            }
          }
        }
        if (FinishProject >= "4.5") {
          if (Reading < "3.5") {
            if (LearnWithVideo < "4.5") {
              if (Age < "20.5") {
                if (ExplainDiagrams < "3.5") {
                  cur_type = "GASVis";
                }
                if (ExplainDiagrams >= "3.5") {
                  if (Gender === "Female") {
                    if (ListeningToNews < "3") {
                      cur_type = "GASVis";
                    }
                    if (ListeningToNews >= "3") {
                      cur_type = "GAIVer";
                    }
                  }
                  if (Gender === "Male") {
                    cur_type = "GAIVer";
                  }
                }
              }
              if (Age >= "20.5") {
                cur_type = "GAIVis";
              }
            }
            if (LearnWithVideo >= "4.5") {
              cur_type = "SAIVis";
            }
          }
          if (Reading >= "3.5") {
            if (Gender === "Female") {
              if (ListeningToNews < "4.5") {
                if (section === "A") {
                  cur_type = "SRIVis";
                }
                if (section === "L") {
                  cur_type = "SRSVis";
                }
                if (section === "D") {
                  cur_type = "SRSVis";
                }
                if (section === "F") {
                  cur_type = "SRSVis";
                }
                if (section === "G") {
                  cur_type = "SRSVis";
                }
                if (section === "K") {
                  cur_type = "SRSVis";
                }
                if (section === "C") {
                  cur_type = "SRSVis";
                }
                if (section === "E") {
                  cur_type = "SRSVis";
                }
                if (section === "R") {
                  cur_type = "SRSVis";
                }
                if (section === "B") {
                  cur_type = "SASVis";
                }
                if (section === "O") {
                  cur_type = "SRSVis";
                }
                if (section === "I") {
                  cur_type = "SRSVis";
                }
                if (section === "H") {
                  cur_type = "SRSVis";
                }
                if (section === "J") {
                  cur_type = "SRSVis";
                }
                if (section === "P") {
                  cur_type = "SRSVis";
                }
                if (section === "Q") {
                  cur_type = "SRSVis";
                }
                if (section === "M") {
                  cur_type = "SRSVis";
                }
                if (section === "S") {
                  cur_type = "SRSVis";
                }
                if (section === "W") {
                  cur_type = "SRSVis";
                }
              }
              if (ListeningToNews >= "4.5") {
                cur_type = "GRIVer";
              }
            }
            if (Gender === "Male") {
              if (RememberByWriting < "2.5") {
                cur_type = "GASVis";
              }
              if (RememberByWriting >= "2.5") {
                if (OralDirections < "4") {
                  cur_type = "SRIVer";
                }
                if (OralDirections >= "4") {
                  if (section === "A") {
                    cur_type = "GRSVer";
                  }
                  if (section === "L") {
                    cur_type = "SRSVis";
                  }
                  if (section === "D") {
                    cur_type = "SRIVis";
                  }
                  if (section === "F") {
                    cur_type = "SRSVis";
                  }
                  if (section === "G") {
                    cur_type = "SRSVis";
                  }
                  if (section === "K") {
                    cur_type = "SRSVis";
                  }
                  if (section === "C") {
                    cur_type = "SRSVis";
                  }
                  if (section === "E") {
                    cur_type = "SRSVis";
                  }
                  if (section === "R") {
                    cur_type = "SRSVis";
                  }
                  if (section === "B") {
                    cur_type = "SRSVis";
                  }
                  if (section === "O") {
                    cur_type = "SRSVis";
                  }
                  if (section === "I") {
                    cur_type = "SRSVis";
                  }
                  if (section === "H") {
                    cur_type = "SRSVis";
                  }
                  if (section === "J") {
                    cur_type = "SRSVis";
                  }
                  if (section === "P") {
                    cur_type = "SRSVis";
                  }
                  if (section === "Q") {
                    cur_type = "SRSVis";
                  }
                  if (section === "M") {
                    cur_type = "SRSVis";
                  }
                  if (section === "S") {
                    cur_type = "SRSVis";
                  }
                  if (section === "W") {
                    cur_type = "SRSVis";
                  }
                }
              }
            }
          }
        }
      }
      if (ListeningOfDiscussions >= "3.5") {
        if (ListenToLecture < "4.5") {
          if (municipality === "SAN MIGUEL") {
            cur_type = "SRSVis";
          }
          if (municipality === "HAGONOY") {
            cur_type = "SAIVis";
          }
          if (municipality === "BULACAN") {
            cur_type = "GAIVer";
          }
          if (municipality === "GUIGUINTO") {
            if (VisualAids < "3") {
              if (Religion === "Catholic") {
                cur_type = "SRSVer";
              }
              if (Religion === "Aglipay") {
                cur_type = "SRSVis";
              }
              if (Religion === "catholic") {
                cur_type = "SRSVis";
              }
              if (Religion === "Roman Catholic") {
                cur_type = "GAIVis";
              }
              if (Religion === "Christian") {
                cur_type = "SRSVis";
              }
              if (Religion === "Baptist") {
                cur_type = "SRSVis";
              }
              if (Religion === "Methodist") {
                cur_type = "SRSVis";
              }
              if (Religion === "III") {
                cur_type = "SRSVis";
              }
              if (Religion === "Born Again /Christian") {
                cur_type = "SRSVis";
              }
              if (Religion === "Born Again Christian") {
                cur_type = "SRSVis";
              }
              if (Religion === "Mormon") {
                cur_type = "SRSVis";
              }
              if (Religion === "Born again Christian") {
                cur_type = "SRSVis";
              }
              if (Religion === "Pentecost Christian") {
                cur_type = "SRSVis";
              }
              if (Religion === "Iglesia Ni Cristo") {
                cur_type = "SRSVis";
              }
              if (Religion === "Born Again") {
                cur_type = "SRSVis";
              }
              if (Religion === "Catholoc") {
                cur_type = "SRSVis";
              }
              if (Religion === "Born again") {
                cur_type = "SRSVis";
              }
              if (Religion === "CATHOLIC") {
                cur_type = "SRSVis";
              }
              if (Religion === "Inc") {
                cur_type = "SRSVis";
              }
              if (Religion === "INC") {
                cur_type = "SRSVis";
              }
              if (Religion === "bobo") {
                cur_type = "SRSVis";
              }
            }
            if (VisualAids >= "3") {
              if (Picture < "4.5") {
                cur_type = "GAIVer";
              }
              if (Picture >= "4.5") {
                cur_type = "SRIVer";
              }
            }
          }
          if (municipality === "BALAGTAS (BIGAA)") {
            cur_type = "SRSVis";
          }
          if (municipality === "SANTA MARIA") {
            cur_type = "SASVis";
          }
          if (municipality === "PANDI") {
            cur_type = "SRSVis";
          }
          if (municipality === "MARILAO") {
            cur_type = "SRSVis";
          }
          if (municipality === "MEYCAUAYAN CITY") {
            cur_type = "SRSVis";
          }
          if (municipality === "PLARIDEL") {
            cur_type = "SRSVis";
          }
          if (municipality === "PULILAN") {
            cur_type = "SRSVis";
          }
          if (municipality === "PAOMBONG") {
            cur_type = "SRSVis";
          }
          if (municipality === "CALUMPIT") {
            if (Gender === "Female") {
              cur_type = "GASVer";
            }
            if (Gender === "Male") {
              cur_type = "SASVer";
            }
          }
          if (municipality === "MALOLOS CITY") {
            if (Gender === "Female") {
              if (RememberByWriting < "3.5") {
                if (ListeningToNews < "3.5") {
                  cur_type = "SASVer";
                }
                if (ListeningToNews >= "3.5") {
                  if (Age < "20.5") {
                    cur_type = "GAIVer";
                  }
                  if (Age >= "20.5") {
                    if (Picture < "4") {
                      cur_type = "SRIVer";
                    }
                    if (Picture >= "4") {
                      cur_type = "SRSVer";
                    }
                  }
                }
              }
              if (RememberByWriting >= "3.5") {
                if (Age < "19") {
                  cur_type = "SRIVer";
                }
                if (Age >= "19") {
                  cur_type = "SAIVer";
                }
              }
            }
            if (Gender === "Male") {
              if (Reading < "4.5") {
                if (ExplainDiagrams < "3") {
                  cur_type = "SRIVer";
                }
                if (ExplainDiagrams >= "3") {
                  if (OrganizingTools < "3") {
                    cur_type = "SASVis";
                  }
                  if (OrganizingTools >= "3") {
                    cur_type = "GASVer";
                  }
                }
              }
              if (Reading >= "4.5") {
                if (ExplainDiagrams < "4.5") {
                  if (Posters < "3") {
                    cur_type = "GRIVer";
                  }
                  if (Posters >= "3") {
                    cur_type = "SRIVer";
                  }
                }
                if (ExplainDiagrams >= "4.5") {
                  cur_type = "SAIVer";
                }
              }
            }
          }
          if (municipality === "SAN RAFAEL") {
            cur_type = "SRSVis";
          }
          if (municipality === "SAN JOSE DEL MONTE CITY") {
            cur_type = "SASVer";
          }
          if (municipality === "BOCAUE") {
            cur_type = "SRSVis";
          }
          if (municipality === "MINALIN") {
            cur_type = "SRSVis";
          }
          if (municipality === "NORZAGARAY") {
            cur_type = "SRSVis";
          }
          if (municipality === "OBANDO") {
            cur_type = "SRSVis";
          }
          if (municipality === "BUSTOS") {
            cur_type = "SRSVis";
          }
          if (municipality === "BALIUAG") {
            cur_type = "SRSVis";
          }
          if (municipality === "ANGELES CITY") {
            cur_type = "SRSVis";
          }
          if (municipality === "APALIT") {
            cur_type = "SRSVis";
          }
          if (
            municipality ===
            "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
          ) {
            cur_type = "SRSVis";
          }
          if (municipality === "SAN ILDEFONSO") {
            cur_type = "SRSVis";
          }
          if (municipality === "GUAGUA") {
            cur_type = "SRSVis";
          }
          if (municipality === "FLORIDABLANCA") {
            cur_type = "SRSVis";
          }
          if (municipality === "CARRANGLAN") {
            cur_type = "SRSVis";
          }
          if (municipality === "LUBAO") {
            cur_type = "SRSVis";
          }
          if (municipality === "ARAYAT") {
            cur_type = "SRSVis";
          }
        }
        if (ListenToLecture >= "4.5") {
          if (municipality === "SAN MIGUEL") {
            cur_type = "SRSVis";
          }
          if (municipality === "HAGONOY") {
            cur_type = "SRSVis";
          }
          if (municipality === "BULACAN") {
            cur_type = "SRSVis";
          }
          if (municipality === "GUIGUINTO") {
            if (ExplainDiagrams < "3.5") {
              cur_type = "SRSVer";
            }
            if (ExplainDiagrams >= "3.5") {
              cur_type = "SASVis";
            }
          }
          if (municipality === "BALAGTAS (BIGAA)") {
            cur_type = "SRSVis";
          }
          if (municipality === "SANTA MARIA") {
            cur_type = "SRSVis";
          }
          if (municipality === "PANDI") {
            cur_type = "SRSVis";
          }
          if (municipality === "MARILAO") {
            cur_type = "SRSVis";
          }
          if (municipality === "MEYCAUAYAN CITY") {
            cur_type = "SRSVis";
          }
          if (municipality === "PLARIDEL") {
            cur_type = "SRSVis";
          }
          if (municipality === "PULILAN") {
            cur_type = "SASVis";
          }
          if (municipality === "PAOMBONG") {
            cur_type = "SRSVis";
          }
          if (municipality === "CALUMPIT") {
            cur_type = "GAIVis";
          }
          if (municipality === "MALOLOS CITY") {
            if (Reading < "3.5") {
              if (Age < "20.5") {
                if (section === "A") {
                  if (RememberByWriting < "3.5") {
                    cur_type = "SASVer";
                  }
                  if (RememberByWriting >= "3.5") {
                    cur_type = "GRIVer";
                  }
                }
                if (section === "L") {
                  cur_type = "SRSVis";
                }
                if (section === "D") {
                  cur_type = "SRSVis";
                }
                if (section === "F") {
                  cur_type = "SRSVis";
                }
                if (section === "G") {
                  cur_type = "SRSVis";
                }
                if (section === "K") {
                  cur_type = "SRSVis";
                }
                if (section === "C") {
                  cur_type = "SRSVis";
                }
                if (section === "E") {
                  cur_type = "SRSVis";
                }
                if (section === "R") {
                  cur_type = "SRSVis";
                }
                if (section === "B") {
                  cur_type = "SASVis";
                }
                if (section === "O") {
                  cur_type = "SRSVis";
                }
                if (section === "I") {
                  cur_type = "SRSVis";
                }
                if (section === "H") {
                  cur_type = "SRSVis";
                }
                if (section === "J") {
                  cur_type = "SRSVis";
                }
                if (section === "P") {
                  cur_type = "SRSVis";
                }
                if (section === "Q") {
                  cur_type = "SRSVis";
                }
                if (section === "M") {
                  cur_type = "SRSVis";
                }
                if (section === "S") {
                  cur_type = "SRSVis";
                }
                if (section === "W") {
                  cur_type = "SRSVis";
                }
              }
              if (Age >= "20.5") {
                cur_type = "GAIVer";
              }
            }
            if (Reading >= "3.5") {
              if (RememberByWriting < "3.5") {
                cur_type = "SASVis";
              }
              if (RememberByWriting >= "3.5") {
                if (FinishProject < "4.5") {
                  cur_type = "SRIVer";
                }
                if (FinishProject >= "4.5") {
                  if (OralDirections < "3.5") {
                    if (Age < "20.5") {
                      cur_type = "SRSVis";
                    }
                    if (Age >= "20.5") {
                      cur_type = "GRSVer";
                    }
                  }
                  if (OralDirections >= "3.5") {
                    cur_type = "SRSVis";
                  }
                }
              }
            }
          }
          if (municipality === "SAN RAFAEL") {
            cur_type = "SRSVis";
          }
          if (municipality === "SAN JOSE DEL MONTE CITY") {
            cur_type = "SRSVis";
          }
          if (municipality === "BOCAUE") {
            cur_type = "SRSVis";
          }
          if (municipality === "MINALIN") {
            cur_type = "SASVis";
          }
          if (municipality === "NORZAGARAY") {
            cur_type = "SRSVis";
          }
          if (municipality === "OBANDO") {
            cur_type = "SRSVis";
          }
          if (municipality === "BUSTOS") {
            cur_type = "SRSVis";
          }
          if (municipality === "BALIUAG") {
            cur_type = "SRSVis";
          }
          if (municipality === "ANGELES CITY") {
            cur_type = "SRSVis";
          }
          if (municipality === "APALIT") {
            cur_type = "SRSVis";
          }
          if (
            municipality ===
            "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
          ) {
            cur_type = "SRSVis";
          }
          if (municipality === "SAN ILDEFONSO") {
            cur_type = "SRSVis";
          }
          if (municipality === "GUAGUA") {
            cur_type = "SRSVis";
          }
          if (municipality === "FLORIDABLANCA") {
            cur_type = "SRSVis";
          }
          if (municipality === "CARRANGLAN") {
            cur_type = "SRSVis";
          }
          if (municipality === "LUBAO") {
            cur_type = "SRSVis";
          }
          if (municipality === "ARAYAT") {
            cur_type = "SRSVis";
          }
        }
      }
    }
    if (specialization === "Web and Mobile Development") {
      if (ListenToLecture < "4.5") {
        if (section === "A") {
          cur_type = "SASVis";
        }
        if (section === "L") {
          cur_type = "GAIVer";
        }
        if (section === "D") {
          cur_type = "SRSVis";
        }
        if (section === "F") {
          if (OrganizingTools < "4.5") {
            if (Gender === "Female") {
              cur_type = "GRIVis";
            }
            if (Gender === "Male") {
              if (OrganizingTools < "3.5") {
                cur_type = "GRIVer";
              }
              if (OrganizingTools >= "3.5") {
                cur_type = "GRSVer";
              }
            }
          }
          if (OrganizingTools >= "4.5") {
            if (Reading < "4") {
              if (Posters < "4.5") {
                cur_type = "GAIVer";
              }
              if (Posters >= "4.5") {
                cur_type = "SRIVer";
              }
            }
            if (Reading >= "4") {
              cur_type = "GRIVer";
            }
          }
        }
        if (section === "G") {
          if (ListeningToNews < "3") {
            if (ListeningOfDiscussions < "3") {
              cur_type = "GRIVer";
            }
            if (ListeningOfDiscussions >= "3") {
              if (Picture < "4.5") {
                cur_type = "SASVis";
              }
              if (Picture >= "4.5") {
                cur_type = "SRIVer";
              }
            }
          }
          if (ListeningToNews >= "3") {
            if (Posters < "3.5") {
              cur_type = "SRIVis";
            }
            if (Posters >= "3.5") {
              cur_type = "GAIVis";
            }
          }
        }
        if (section === "K") {
          if (OralDirections < "3.5") {
            cur_type = "SRSVis";
          }
          if (OralDirections >= "3.5") {
            cur_type = "SASVis";
          }
        }
        if (section === "C") {
          cur_type = "SRSVis";
        }
        if (section === "E") {
          if (Religion === "Catholic") {
            if (municipality === "SAN MIGUEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "HAGONOY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BULACAN") {
              if (Picture < "2.5") {
                cur_type = "SRSVis";
              }
              if (Picture >= "2.5") {
                cur_type = "SRSVer";
              }
            }
            if (municipality === "GUIGUINTO") {
              cur_type = "GRSVer";
            }
            if (municipality === "BALAGTAS (BIGAA)") {
              cur_type = "SRSVis";
            }
            if (municipality === "SANTA MARIA") {
              cur_type = "SRSVis";
            }
            if (municipality === "PANDI") {
              cur_type = "SRSVis";
            }
            if (municipality === "MARILAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "MEYCAUAYAN CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "PLARIDEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "PULILAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "PAOMBONG") {
              cur_type = "SRSVis";
            }
            if (municipality === "CALUMPIT") {
              cur_type = "SASVer";
            }
            if (municipality === "MALOLOS CITY") {
              if (ListeningToLectures < "3") {
                cur_type = "GAIVer";
              }
              if (ListeningToLectures >= "3") {
                if (Picture < "3") {
                  cur_type = "SRIVer";
                }
                if (Picture >= "3") {
                  cur_type = "GRSVer";
                }
              }
            }
            if (municipality === "SAN RAFAEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN JOSE DEL MONTE CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BOCAUE") {
              cur_type = "SRSVis";
            }
            if (municipality === "MINALIN") {
              cur_type = "SRSVis";
            }
            if (municipality === "NORZAGARAY") {
              cur_type = "SRSVis";
            }
            if (municipality === "OBANDO") {
              cur_type = "SRSVis";
            }
            if (municipality === "BUSTOS") {
              cur_type = "SRSVis";
            }
            if (municipality === "BALIUAG") {
              cur_type = "SRSVis";
            }
            if (municipality === "ANGELES CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "APALIT") {
              cur_type = "SRSVis";
            }
            if (
              municipality ===
              "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
            ) {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN ILDEFONSO") {
              cur_type = "SRSVis";
            }
            if (municipality === "GUAGUA") {
              cur_type = "SRSVis";
            }
            if (municipality === "FLORIDABLANCA") {
              cur_type = "SRSVis";
            }
            if (municipality === "CARRANGLAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "LUBAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "ARAYAT") {
              cur_type = "SRSVis";
            }
          }
          if (Religion === "Aglipay") {
            cur_type = "SRSVis";
          }
          if (Religion === "catholic") {
            cur_type = "SRSVis";
          }
          if (Religion === "Roman Catholic") {
            cur_type = "SRSVis";
          }
          if (Religion === "Christian") {
            cur_type = "SRSVis";
          }
          if (Religion === "Baptist") {
            cur_type = "SRSVis";
          }
          if (Religion === "Methodist") {
            cur_type = "SRSVis";
          }
          if (Religion === "III") {
            cur_type = "SRSVis";
          }
          if (Religion === "Born Again /Christian") {
            cur_type = "SRSVis";
          }
          if (Religion === "Born Again Christian") {
            cur_type = "SRSVis";
          }
          if (Religion === "Mormon") {
            cur_type = "SRSVis";
          }
          if (Religion === "Born again Christian") {
            cur_type = "SRSVis";
          }
          if (Religion === "Pentecost Christian") {
            cur_type = "SRSVis";
          }
          if (Religion === "Iglesia Ni Cristo") {
            cur_type = "GRSVis";
          }
          if (Religion === "Born Again") {
            cur_type = "GAIVer";
          }
          if (Religion === "Catholoc") {
            cur_type = "SRSVis";
          }
          if (Religion === "Born again") {
            cur_type = "SRSVis";
          }
          if (Religion === "CATHOLIC") {
            cur_type = "SRSVis";
          }
          if (Religion === "Inc") {
            cur_type = "SRSVis";
          }
          if (Religion === "INC") {
            cur_type = "SRSVis";
          }
          if (Religion === "bobo") {
            cur_type = "SRSVis";
          }
        }
        if (section === "R") {
          cur_type = "SASVis";
        }
        if (section === "B") {
          cur_type = "SRSVis";
        }
        if (section === "O") {
          cur_type = "GRIVis";
        }
        if (section === "I") {
          cur_type = "SRSVis";
        }
        if (section === "H") {
          if (ListeningToNews < "3.5") {
            cur_type = "SASVis";
          }
          if (ListeningToNews >= "3.5") {
            cur_type = "SRSVis";
          }
        }
        if (section === "J") {
          cur_type = "SASVis";
        }
        if (section === "P") {
          cur_type = "GRIVer";
        }
        if (section === "Q") {
          cur_type = "SRSVis";
        }
        if (section === "M") {
          cur_type = "SRSVis";
        }
        if (section === "S") {
          cur_type = "SRSVis";
        }
        if (section === "W") {
          cur_type = "SRSVis";
        }
      }
      if (ListenToLecture >= "4.5") {
        if (section === "A") {
          cur_type = "SRSVis";
        }
        if (section === "L") {
          cur_type = "GASVis";
        }
        if (section === "D") {
          cur_type = "SRSVis";
        }
        if (section === "F") {
          if (OralDirections < "3.5") {
            if (ExplainDiagrams < "3") {
              cur_type = "SASVer";
            }
            if (ExplainDiagrams >= "3") {
              if (Gender === "Female") {
                cur_type = "SRIVer";
              }
              if (Gender === "Male") {
                if (Picture < "3.5") {
                  cur_type = "SRIVer";
                }
                if (Picture >= "3.5") {
                  cur_type = "GRIVer";
                }
              }
            }
          }
          if (OralDirections >= "3.5") {
            if (Age < "20.5") {
              if (Gender === "Female") {
                cur_type = "SRIVer";
              }
              if (Gender === "Male") {
                cur_type = "GRIVer";
              }
            }
            if (Age >= "20.5") {
              cur_type = "GASVer";
            }
          }
        }
        if (section === "G") {
          cur_type = "SASVer";
        }
        if (section === "K") {
          cur_type = "SRSVis";
        }
        if (section === "C") {
          cur_type = "SRSVis";
        }
        if (section === "E") {
          if (OrganizingTools < "4.5") {
            cur_type = "SAIVer";
          }
          if (OrganizingTools >= "4.5") {
            if (LearnWithVideo < "4.5") {
              cur_type = "GRIVer";
            }
            if (LearnWithVideo >= "4.5") {
              cur_type = "SRSVis";
            }
          }
        }
        if (section === "R") {
          cur_type = "SRSVis";
        }
        if (section === "B") {
          cur_type = "SRSVis";
        }
        if (section === "O") {
          cur_type = "SRSVis";
        }
        if (section === "I") {
          cur_type = "GRSVis";
        }
        if (section === "H") {
          cur_type = "SRSVis";
        }
        if (section === "J") {
          cur_type = "GRIVis";
        }
        if (section === "P") {
          cur_type = "SRSVis";
        }
        if (section === "Q") {
          cur_type = "SRSVis";
        }
        if (section === "M") {
          cur_type = "GRSVer";
        }
        if (section === "S") {
          cur_type = "GASVis";
        }
        if (section === "W") {
          cur_type = "SRSVis";
        }
      }
    }
    if (specialization === "Service Management") {
      if (municipality === "SAN MIGUEL") {
        cur_type = "SRSVis";
      }
      if (municipality === "HAGONOY") {
        cur_type = "SASVis";
      }
      if (municipality === "BULACAN") {
        cur_type = "SRSVis";
      }
      if (municipality === "GUIGUINTO") {
        cur_type = "SRSVis";
      }
      if (municipality === "BALAGTAS (BIGAA)") {
        cur_type = "GRSVis";
      }
      if (municipality === "SANTA MARIA") {
        cur_type = "SAIVis";
      }
      if (municipality === "PANDI") {
        cur_type = "SRSVis";
      }
      if (municipality === "MARILAO") {
        cur_type = "SASVis";
      }
      if (municipality === "MEYCAUAYAN CITY") {
        cur_type = "SRSVis";
      }
      if (municipality === "PLARIDEL") {
        cur_type = "SRSVis";
      }
      if (municipality === "PULILAN") {
        cur_type = "SRSVis";
      }
      if (municipality === "PAOMBONG") {
        if (ListeningToLectures < "3") {
          cur_type = "SASVer";
        }
        if (ListeningToLectures >= "3") {
          cur_type = "GRSVer";
        }
      }
      if (municipality === "CALUMPIT") {
        cur_type = "SASVis";
      }
      if (municipality === "MALOLOS CITY") {
        if (RememberByWriting < "2.5") {
          if (OralDirections < "3.5") {
            cur_type = "SASVer";
          }
          if (OralDirections >= "3.5") {
            if (ListenToLecture < "3.5") {
              cur_type = "SRSVer";
            }
            if (ListenToLecture >= "3.5") {
              cur_type = "GRIVer";
            }
          }
        }
        if (RememberByWriting >= "2.5") {
          if (Gender === "Female") {
            if (RememberByWriting < "4") {
              if (Age < "19.5") {
                cur_type = "GRSVer";
              }
              if (Age >= "19.5") {
                cur_type = "GRIVer";
              }
            }
            if (RememberByWriting >= "4") {
              cur_type = "GRSVer";
            }
          }
          if (Gender === "Male") {
            if (ListenToLecture < "4.5") {
              cur_type = "GRIVer";
            }
            if (ListenToLecture >= "4.5") {
              if (ListeningToNews < "4") {
                cur_type = "GRIVer";
              }
              if (ListeningToNews >= "4") {
                if (ListeningOfDiscussions < "4.5") {
                  cur_type = "GAIVer";
                }
                if (ListeningOfDiscussions >= "4.5") {
                  cur_type = "GRIVer";
                }
              }
            }
          }
        }
      }
      if (municipality === "SAN RAFAEL") {
        cur_type = "SRSVis";
      }
      if (municipality === "SAN JOSE DEL MONTE CITY") {
        cur_type = "SRSVis";
      }
      if (municipality === "BOCAUE") {
        cur_type = "SRSVis";
      }
      if (municipality === "MINALIN") {
        cur_type = "SRSVis";
      }
      if (municipality === "NORZAGARAY") {
        cur_type = "SRSVis";
      }
      if (municipality === "OBANDO") {
        cur_type = "SRSVis";
      }
      if (municipality === "BUSTOS") {
        cur_type = "SRSVis";
      }
      if (municipality === "BALIUAG") {
        cur_type = "SRSVis";
      }
      if (municipality === "ANGELES CITY") {
        cur_type = "SRSVis";
      }
      if (municipality === "APALIT") {
        cur_type = "SRSVis";
      }
      if (
        municipality === "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
      ) {
        cur_type = "SRSVis";
      }
      if (municipality === "SAN ILDEFONSO") {
        cur_type = "SRSVis";
      }
      if (municipality === "GUAGUA") {
        cur_type = "SRSVis";
      }
      if (municipality === "FLORIDABLANCA") {
        cur_type = "SRSVis";
      }
      if (municipality === "CARRANGLAN") {
        cur_type = "SRSVis";
      }
      if (municipality === "LUBAO") {
        cur_type = "SRSVis";
      }
      if (municipality === "ARAYAT") {
        cur_type = "SRSVis";
      }
    }
    if (specialization === "Not Applicable") {
      if (VisualAids < "3.5") {
        if (OrganizingTools < "2.5") {
          if (section === "A") {
            cur_type = "SRSVis";
          }
          if (section === "L") {
            cur_type = "SRSVis";
          }
          if (section === "D") {
            cur_type = "SRSVis";
          }
          if (section === "F") {
            if (ExplainDiagrams < "4.5") {
              cur_type = "SAIVer";
            }
            if (ExplainDiagrams >= "4.5") {
              cur_type = "SRIVis";
            }
          }
          if (section === "G") {
            if (RememberByWriting < "3") {
              cur_type = "GRSVis";
            }
            if (RememberByWriting >= "3") {
              cur_type = "SRSVer";
            }
          }
          if (section === "K") {
            cur_type = "SRSVis";
          }
          if (section === "C") {
            cur_type = "SRSVis";
          }
          if (section === "E") {
            cur_type = "GRSVis";
          }
          if (section === "R") {
            cur_type = "SRSVis";
          }
          if (section === "B") {
            cur_type = "SRSVis";
          }
          if (section === "O") {
            cur_type = "SRSVis";
          }
          if (section === "I") {
            cur_type = "SRSVis";
          }
          if (section === "H") {
            cur_type = "SRSVis";
          }
          if (section === "J") {
            cur_type = "SRSVis";
          }
          if (section === "P") {
            cur_type = "SRSVis";
          }
          if (section === "Q") {
            cur_type = "SRSVis";
          }
          if (section === "M") {
            cur_type = "SRSVis";
          }
          if (section === "S") {
            cur_type = "SRSVis";
          }
          if (section === "W") {
            cur_type = "SASVer";
          }
        }
        if (OrganizingTools >= "2.5") {
          if (Posters < "2.5") {
            if (section === "A") {
              cur_type = "GASVis";
            }
            if (section === "L") {
              cur_type = "SRSVis";
            }
            if (section === "D") {
              cur_type = "SRSVis";
            }
            if (section === "F") {
              cur_type = "SRSVis";
            }
            if (section === "G") {
              if (municipality === "SAN MIGUEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "HAGONOY") {
                cur_type = "SRSVis";
              }
              if (municipality === "BULACAN") {
                cur_type = "GRIVer";
              }
              if (municipality === "GUIGUINTO") {
                cur_type = "SRSVis";
              }
              if (municipality === "BALAGTAS (BIGAA)") {
                cur_type = "SRSVis";
              }
              if (municipality === "SANTA MARIA") {
                cur_type = "SRSVis";
              }
              if (municipality === "PANDI") {
                cur_type = "SRSVis";
              }
              if (municipality === "MARILAO") {
                cur_type = "SRSVis";
              }
              if (municipality === "MEYCAUAYAN CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "PLARIDEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "PULILAN") {
                cur_type = "SRSVis";
              }
              if (municipality === "PAOMBONG") {
                cur_type = "SRSVis";
              }
              if (municipality === "CALUMPIT") {
                cur_type = "SRSVis";
              }
              if (municipality === "MALOLOS CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN RAFAEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN JOSE DEL MONTE CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "BOCAUE") {
                cur_type = "SRSVer";
              }
              if (municipality === "MINALIN") {
                cur_type = "SRSVis";
              }
              if (municipality === "NORZAGARAY") {
                cur_type = "SRSVis";
              }
              if (municipality === "OBANDO") {
                cur_type = "SRSVis";
              }
              if (municipality === "BUSTOS") {
                cur_type = "SRSVis";
              }
              if (municipality === "BALIUAG") {
                cur_type = "SRSVis";
              }
              if (municipality === "ANGELES CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "APALIT") {
                cur_type = "SRSVis";
              }
              if (
                municipality ===
                "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
              ) {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN ILDEFONSO") {
                cur_type = "SRSVis";
              }
              if (municipality === "GUAGUA") {
                cur_type = "SRSVis";
              }
              if (municipality === "FLORIDABLANCA") {
                cur_type = "SRSVis";
              }
              if (municipality === "CARRANGLAN") {
                cur_type = "SRSVis";
              }
              if (municipality === "LUBAO") {
                cur_type = "SRSVis";
              }
              if (municipality === "ARAYAT") {
                cur_type = "SRSVis";
              }
            }
            if (section === "K") {
              cur_type = "SRSVis";
            }
            if (section === "C") {
              cur_type = "SRSVis";
            }
            if (section === "E") {
              if (Age < "19.5") {
                cur_type = "SASVis";
              }
              if (Age >= "19.5") {
                if (ListeningToNews < "4.5") {
                  cur_type = "SRIVis";
                }
                if (ListeningToNews >= "4.5") {
                  cur_type = "GASVer";
                }
              }
            }
            if (section === "R") {
              cur_type = "SRSVis";
            }
            if (section === "B") {
              cur_type = "SRSVis";
            }
            if (section === "O") {
              cur_type = "SRSVis";
            }
            if (section === "I") {
              cur_type = "SRSVis";
            }
            if (section === "H") {
              cur_type = "SRSVis";
            }
            if (section === "J") {
              cur_type = "SRSVis";
            }
            if (section === "P") {
              cur_type = "SRSVis";
            }
            if (section === "Q") {
              cur_type = "SRSVis";
            }
            if (section === "M") {
              cur_type = "SRSVis";
            }
            if (section === "S") {
              cur_type = "SRSVis";
            }
            if (section === "W") {
              cur_type = "SRSVis";
            }
          }
          if (Posters >= "2.5") {
            if (Picture < "3.5") {
              if (municipality === "SAN MIGUEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "HAGONOY") {
                cur_type = "SRSVis";
              }
              if (municipality === "BULACAN") {
                if (family_type === "Nuclear Family") {
                  cur_type = "GRIVer";
                }
                if (family_type === "Extended Family") {
                  cur_type = "SRSVis";
                }
                if (family_type === " Single") {
                  cur_type = "GRIVis";
                }
                if (family_type === "Grand Parent Family") {
                  cur_type = "SRSVis";
                }
                if (family_type === " Step Family") {
                  cur_type = "GRIVis";
                }
              }
              if (municipality === "GUIGUINTO") {
                cur_type = "SRSVis";
              }
              if (municipality === "BALAGTAS (BIGAA)") {
                cur_type = "SRSVis";
              }
              if (municipality === "SANTA MARIA") {
                cur_type = "SRSVis";
              }
              if (municipality === "PANDI") {
                cur_type = "SRSVis";
              }
              if (municipality === "MARILAO") {
                cur_type = "SRSVis";
              }
              if (municipality === "MEYCAUAYAN CITY") {
                cur_type = "GAIVer";
              }
              if (municipality === "PLARIDEL") {
                cur_type = "SRSVer";
              }
              if (municipality === "PULILAN") {
                cur_type = "SRSVis";
              }
              if (municipality === "PAOMBONG") {
                cur_type = "SRSVis";
              }
              if (municipality === "CALUMPIT") {
                cur_type = "GRIVer";
              }
              if (municipality === "MALOLOS CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN RAFAEL") {
                cur_type = "GRIVer";
              }
              if (municipality === "SAN JOSE DEL MONTE CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "BOCAUE") {
                cur_type = "SRSVis";
              }
              if (municipality === "MINALIN") {
                cur_type = "SRSVis";
              }
              if (municipality === "NORZAGARAY") {
                cur_type = "SRSVis";
              }
              if (municipality === "OBANDO") {
                cur_type = "SRSVis";
              }
              if (municipality === "BUSTOS") {
                cur_type = "GRIVer";
              }
              if (municipality === "BALIUAG") {
                cur_type = "SAIVer";
              }
              if (municipality === "ANGELES CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "APALIT") {
                cur_type = "SRSVis";
              }
              if (
                municipality ===
                "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
              ) {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN ILDEFONSO") {
                cur_type = "SRSVis";
              }
              if (municipality === "GUAGUA") {
                cur_type = "SRSVis";
              }
              if (municipality === "FLORIDABLANCA") {
                cur_type = "SASVis";
              }
              if (municipality === "CARRANGLAN") {
                cur_type = "SRSVis";
              }
              if (municipality === "LUBAO") {
                cur_type = "GRIVer";
              }
              if (municipality === "ARAYAT") {
                cur_type = "SRSVis";
              }
            }
            if (Picture >= "3.5") {
              if (FinishProject < "4") {
                if (Age < "19.5") {
                  if (ListeningToLectures < "4.5") {
                    cur_type = "GAIVer";
                  }
                  if (ListeningToLectures >= "4.5") {
                    cur_type = "SAIVis";
                  }
                }
                if (Age >= "19.5") {
                  cur_type = "SAIVis";
                }
              }
              if (FinishProject >= "4") {
                if (ListeningToLectures < "4.5") {
                  if (OralDirections < "1.5") {
                    cur_type = "SASVis";
                  }
                  if (OralDirections >= "1.5") {
                    cur_type = "GASVis";
                  }
                }
                if (ListeningToLectures >= "4.5") {
                  cur_type = "GRIVis";
                }
              }
            }
          }
        }
      }
      if (VisualAids >= "3.5") {
        if (OrganizingTools < "4.5") {
          if (ListeningOfDiscussions < "4.5") {
            if (FinishProject < "3.5") {
              if (municipality === "SAN MIGUEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "HAGONOY") {
                cur_type = "GRIVis";
              }
              if (municipality === "BULACAN") {
                cur_type = "SRSVis";
              }
              if (municipality === "GUIGUINTO") {
                cur_type = "SRSVis";
              }
              if (municipality === "BALAGTAS (BIGAA)") {
                cur_type = "SRSVis";
              }
              if (municipality === "SANTA MARIA") {
                cur_type = "SRSVis";
              }
              if (municipality === "PANDI") {
                cur_type = "SRSVis";
              }
              if (municipality === "MARILAO") {
                cur_type = "SRSVis";
              }
              if (municipality === "MEYCAUAYAN CITY") {
                cur_type = "GRSVis";
              }
              if (municipality === "PLARIDEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "PULILAN") {
                cur_type = "GRSVis";
              }
              if (municipality === "PAOMBONG") {
                cur_type = "SRSVis";
              }
              if (municipality === "CALUMPIT") {
                cur_type = "SRSVis";
              }
              if (municipality === "MALOLOS CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN RAFAEL") {
                cur_type = "SRSVis";
              }
              if (municipality === "SAN JOSE DEL MONTE CITY") {
                cur_type = "SRSVis";
              }
              if (municipality === "BOCAUE") {
                cur_type = "SASVis";
              }
              if (municipality === "MINALIN") {
                cur_type = "SRSVis";
              }
              if (municipality === "NORZAGARAY") {
                cur_type = "SRSVis";
              }
              if (municipality === "OBANDO") {
                cur_type = "SRSVis";
              }
              if (municipality === "BUSTOS") {
                cur_type = "SRSVis";
              }
              if (municipality === "BALIUAG") {
                cur_type = "GRSVis";
              }
              if (municipality === "ANGELES CITY") {
                cur_type = "SASVis";
              }
              if (municipality === "APALIT") {
                cur_type = "SRSVis";
              }
              if (
                municipality ===
                "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
              ) {
                cur_type = "SASVis";
              }
              if (municipality === "SAN ILDEFONSO") {
                cur_type = "SRSVis";
              }
              if (municipality === "GUAGUA") {
                cur_type = "SASVer";
              }
              if (municipality === "FLORIDABLANCA") {
                cur_type = "SRSVis";
              }
              if (municipality === "CARRANGLAN") {
                cur_type = "SRSVis";
              }
              if (municipality === "LUBAO") {
                cur_type = "SRSVis";
              }
              if (municipality === "ARAYAT") {
                cur_type = "SRSVis";
              }
            }
            if (FinishProject >= "3.5") {
              if (section === "A") {
                if (ListeningToLectures < "4.5") {
                  if (municipality === "SAN MIGUEL") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "HAGONOY") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "BULACAN") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "GUIGUINTO") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "BALAGTAS (BIGAA)") {
                    cur_type = "SASVis";
                  }
                  if (municipality === "SANTA MARIA") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "PANDI") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "MARILAO") {
                    cur_type = "GRIVer";
                  }
                  if (municipality === "MEYCAUAYAN CITY") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "PLARIDEL") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "PULILAN") {
                    cur_type = "GRSVer";
                  }
                  if (municipality === "PAOMBONG") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "CALUMPIT") {
                    cur_type = "SASVis";
                  }
                  if (municipality === "MALOLOS CITY") {
                    cur_type = "GRIVer";
                  }
                  if (municipality === "SAN RAFAEL") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "SAN JOSE DEL MONTE CITY") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "BOCAUE") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "MINALIN") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "NORZAGARAY") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "OBANDO") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "BUSTOS") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "BALIUAG") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "ANGELES CITY") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "APALIT") {
                    cur_type = "SASVis";
                  }
                  if (
                    municipality ===
                    "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
                  ) {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "SAN ILDEFONSO") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "GUAGUA") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "FLORIDABLANCA") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "CARRANGLAN") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "LUBAO") {
                    cur_type = "SRSVis";
                  }
                  if (municipality === "ARAYAT") {
                    cur_type = "SRSVis";
                  }
                }
                if (ListeningToLectures >= "4.5") {
                  cur_type = "SASVer";
                }
              }
              if (section === "L") {
                cur_type = "SRSVis";
              }
              if (section === "D") {
                cur_type = "SRSVis";
              }
              if (section === "F") {
                cur_type = "SASVer";
              }
              if (section === "G") {
                cur_type = "SRSVis";
              }
              if (section === "K") {
                cur_type = "SRSVis";
              }
              if (section === "C") {
                cur_type = "GASVis";
              }
              if (section === "E") {
                if (Religion === "Catholic") {
                  cur_type = "SASVer";
                }
                if (Religion === "Aglipay") {
                  cur_type = "SRSVis";
                }
                if (Religion === "catholic") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Roman Catholic") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Christian") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Baptist") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Methodist") {
                  cur_type = "SRSVis";
                }
                if (Religion === "III") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Born Again /Christian") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Born Again Christian") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Mormon") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Born again Christian") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Pentecost Christian") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Iglesia Ni Cristo") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Born Again") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Catholoc") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Born again") {
                  cur_type = "SRSVis";
                }
                if (Religion === "CATHOLIC") {
                  cur_type = "SRSVis";
                }
                if (Religion === "Inc") {
                  cur_type = "GASVis";
                }
                if (Religion === "INC") {
                  cur_type = "SRSVis";
                }
                if (Religion === "bobo") {
                  cur_type = "SRSVis";
                }
              }
              if (section === "R") {
                cur_type = "SRSVis";
              }
              if (section === "B") {
                if (LearnWithVideo < "3.5") {
                  cur_type = "SASVer";
                }
                if (LearnWithVideo >= "3.5") {
                  cur_type = "GRSVer";
                }
              }
              if (section === "O") {
                cur_type = "SRSVis";
              }
              if (section === "I") {
                cur_type = "SRSVis";
              }
              if (section === "H") {
                cur_type = "SASVis";
              }
              if (section === "J") {
                cur_type = "SRSVis";
              }
              if (section === "P") {
                cur_type = "SRSVis";
              }
              if (section === "Q") {
                cur_type = "SRSVis";
              }
              if (section === "M") {
                cur_type = "SRSVis";
              }
              if (section === "S") {
                cur_type = "SRSVis";
              }
              if (section === "W") {
                cur_type = "SRSVis";
              }
            }
          }
          if (ListeningOfDiscussions >= "4.5") {
            if (RememberByWriting < "4.5") {
              if (ListeningToLectures < "2.5") {
                cur_type = "SRIVis";
              }
              if (ListeningToLectures >= "2.5") {
                if (Picture < "4") {
                  if (ListeningToLectures < "4") {
                    cur_type = "GRIVer";
                  }
                  if (ListeningToLectures >= "4") {
                    cur_type = "GRIVis";
                  }
                }
                if (Picture >= "4") {
                  cur_type = "GRIVer";
                }
              }
            }
            if (RememberByWriting >= "4.5") {
              if (Gender === "Female") {
                cur_type = "GRSVis";
              }
              if (Gender === "Male") {
                if (Posters < "4.5") {
                  cur_type = "GASVer";
                }
                if (Posters >= "4.5") {
                  cur_type = "GRIVer";
                }
              }
            }
          }
        }
        if (OrganizingTools >= "4.5") {
          if (RememberByWriting < "4.5") {
            if (municipality === "SAN MIGUEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "HAGONOY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BULACAN") {
              if (family_type === "Nuclear Family") {
                cur_type = "GRIVis";
              }
              if (family_type === "Extended Family") {
                cur_type = "GRIVer";
              }
              if (family_type === " Single") {
                cur_type = "SRSVis";
              }
              if (family_type === "Grand Parent Family") {
                cur_type = "SRSVis";
              }
              if (family_type === " Step Family") {
                cur_type = "SRSVis";
              }
            }
            if (municipality === "GUIGUINTO") {
              cur_type = "SRSVis";
            }
            if (municipality === "BALAGTAS (BIGAA)") {
              cur_type = "SRSVis";
            }
            if (municipality === "SANTA MARIA") {
              cur_type = "SRSVis";
            }
            if (municipality === "PANDI") {
              cur_type = "GRIVer";
            }
            if (municipality === "MARILAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "MEYCAUAYAN CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "PLARIDEL") {
              cur_type = "GRIVer";
            }
            if (municipality === "PULILAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "PAOMBONG") {
              cur_type = "SRSVis";
            }
            if (municipality === "CALUMPIT") {
              if (Age < "19.5") {
                cur_type = "SRIVer";
              }
              if (Age >= "19.5") {
                cur_type = "GRSVis";
              }
            }
            if (municipality === "MALOLOS CITY") {
              cur_type = "SASVis";
            }
            if (municipality === "SAN RAFAEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN JOSE DEL MONTE CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BOCAUE") {
              cur_type = "GRIVer";
            }
            if (municipality === "MINALIN") {
              cur_type = "SRSVis";
            }
            if (municipality === "NORZAGARAY") {
              cur_type = "SRSVis";
            }
            if (municipality === "OBANDO") {
              cur_type = "SRSVis";
            }
            if (municipality === "BUSTOS") {
              cur_type = "SRIVer";
            }
            if (municipality === "BALIUAG") {
              if (RememberByWriting < "3.5") {
                cur_type = "GASVer";
              }
              if (RememberByWriting >= "3.5") {
                cur_type = "GRIVer";
              }
            }
            if (municipality === "ANGELES CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "APALIT") {
              cur_type = "SRSVis";
            }
            if (
              municipality ===
              "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
            ) {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN ILDEFONSO") {
              cur_type = "SRSVis";
            }
            if (municipality === "GUAGUA") {
              cur_type = "SRSVis";
            }
            if (municipality === "FLORIDABLANCA") {
              cur_type = "SRSVis";
            }
            if (municipality === "CARRANGLAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "LUBAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "ARAYAT") {
              cur_type = "SRSVis";
            }
          }
          if (RememberByWriting >= "4.5") {
            if (municipality === "SAN MIGUEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "HAGONOY") {
              cur_type = "SASVis";
            }
            if (municipality === "BULACAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "GUIGUINTO") {
              cur_type = "SRSVis";
            }
            if (municipality === "BALAGTAS (BIGAA)") {
              cur_type = "SRSVis";
            }
            if (municipality === "SANTA MARIA") {
              cur_type = "SRSVis";
            }
            if (municipality === "PANDI") {
              cur_type = "GASVer";
            }
            if (municipality === "MARILAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "MEYCAUAYAN CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "PLARIDEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "PULILAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "PAOMBONG") {
              cur_type = "SRSVis";
            }
            if (municipality === "CALUMPIT") {
              cur_type = "SRSVis";
            }
            if (municipality === "MALOLOS CITY") {
              if (family_type === "Nuclear Family") {
                cur_type = "GRIVis";
              }
              if (family_type === "Extended Family") {
                cur_type = "SRIVer";
              }
              if (family_type === " Single") {
                cur_type = "SASVis";
              }
              if (family_type === "Grand Parent Family") {
                cur_type = "SRSVis";
              }
              if (family_type === " Step Family") {
                cur_type = "SRSVis";
              }
            }
            if (municipality === "SAN RAFAEL") {
              cur_type = "SRSVis";
            }
            if (municipality === "SAN JOSE DEL MONTE CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "BOCAUE") {
              cur_type = "SASVer";
            }
            if (municipality === "MINALIN") {
              cur_type = "SRSVis";
            }
            if (municipality === "NORZAGARAY") {
              cur_type = "SRSVis";
            }
            if (municipality === "OBANDO") {
              cur_type = "SRSVis";
            }
            if (municipality === "BUSTOS") {
              cur_type = "SRSVis";
            }
            if (municipality === "BALIUAG") {
              cur_type = "SRSVis";
            }
            if (municipality === "ANGELES CITY") {
              cur_type = "SRSVis";
            }
            if (municipality === "APALIT") {
              cur_type = "SRSVis";
            }
            if (
              municipality ===
              "DO\u00c3\u0192\u00e2\u20ac\u02dcA REMEDIOS TRINIDAD"
            ) {
              cur_type = "SASVis";
            }
            if (municipality === "SAN ILDEFONSO") {
              cur_type = "SRSVis";
            }
            if (municipality === "GUAGUA") {
              cur_type = "SRSVis";
            }
            if (municipality === "FLORIDABLANCA") {
              cur_type = "SRSVis";
            }
            if (municipality === "CARRANGLAN") {
              cur_type = "SRSVis";
            }
            if (municipality === "LUBAO") {
              cur_type = "SRSVis";
            }
            if (municipality === "ARAYAT") {
              cur_type = "SRSVis";
            }
          }
        }
      }
    }
  }
  return cur_type;
}

//# sourceMappingURL=output_python.js.map
